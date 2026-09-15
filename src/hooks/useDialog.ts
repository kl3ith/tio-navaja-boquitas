import { useCallback, useEffect, useRef } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Comportamiento compartido de diálogos: bloqueo de scroll sin perder la posición
 * (funciona en iOS), foco inicial, trampa de foco, ESC y devolución del foco al cerrar.
 */
export function useDialog(open: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const initialFocusRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  // referencia estable para que el listener de ESC no se re-suscriba en cada render
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return
    lastFocus.current = document.activeElement as HTMLElement
    const y = window.scrollY
    const root = document.getElementById('root')
    const { style } = document.body
    style.position = 'fixed'
    style.top = `-${y}px`
    style.left = '0'
    style.right = '0'
    style.width = '100%'
    document.body.classList.add('modal-open')
    root?.setAttribute('inert', '')
    initialFocusRef.current?.focus()
    // ESC a nivel de documento: funciona aunque el foco se haya salido del diálogo
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onCloseRef.current()
      }
    }
    document.addEventListener('keydown', onEsc, true)
    return () => {
      document.removeEventListener('keydown', onEsc, true)
      style.position = ''
      style.top = ''
      style.left = ''
      style.right = ''
      style.width = ''
      document.body.classList.remove('modal-open')
      root?.removeAttribute('inert')
      window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior })
      lastFocus.current?.focus?.()
    }
  }, [open])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Tab' && dialogRef.current) {
        const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (n) => n.offsetParent !== null || n === document.activeElement,
        )
        if (!nodes.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    },
    [],
  )

  return { dialogRef, initialFocusRef, onKeyDown }
}
