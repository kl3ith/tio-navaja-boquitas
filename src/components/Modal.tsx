import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import type { Boquita, Category } from '../content/boquitas'
import { Picture } from './Picture'
import { Close } from './Icons'
import './Modal.css'

interface Props {
  item: Boquita | null
  category: Category | null
  onClose: () => void
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Modal({ item, category, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const open = !!item

  // Bloqueo de scroll sin perder la posición (funciona también en iOS)
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
    closeRef.current?.focus()
    return () => {
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

  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
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
    [onClose],
  )

  if (!item) return null
  const idx = category ? category.items.findIndex((i) => i.id === item.id) + 1 : 0

  return createPortal(
    <div className={`modal ${category ? `modal--${category.id}` : ''}`} onKeyDown={onKey}>
      <div className="modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={item.description ? 'modal-desc' : undefined}
        ref={dialogRef}
      >
        <button type="button" className="modal__close" onClick={onClose} ref={closeRef} aria-label="Cerrar">
          <Close />
        </button>
        <div className="modal__media">
          {item.image ? (
            <Picture name={item.image} alt={item.alt ?? item.name} sizes="(max-width: 900px) 100vw, 55vw" />
          ) : (
            <div className="modal__typo" aria-hidden="true">
              <span className="modal__typo-num display">{String(idx).padStart(2, '0')}</span>
              <span className="modal__typo-word display display-italic">{item.name}</span>
            </div>
          )}
        </div>
        <div className="modal__body">
          {category && (
            <p className="modal__kicker kicker">
              {category.label} <span aria-hidden="true">·</span> {String(idx).padStart(2, '0')} / {String(category.items.length).padStart(2, '0')}
            </p>
          )}
          <h2 id="modal-title" className="modal__title display">
            {item.name}
          </h2>
          {item.description && (
            <p id="modal-desc" className="modal__desc">
              {item.description}
            </p>
          )}
          <hr className="rule modal__rule" />
          <p className="modal__foot">Tío Navaja · El Cangrejo</p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
