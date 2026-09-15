import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelection } from '../hooks/useSelection'
import { useDialog } from '../hooks/useDialog'
import {
  QUOTE_COPY,
  buildContactLink,
  buildQuoteMessage,
  contactChannel,
  type QuoteDetails,
} from '../content/quote'
import { Close, Copy, Check, Minus } from './Icons'
import { Logo } from './Brand'
import './QuotePanel.css'

interface Props {
  open: boolean
  onClose: () => void
  /** navega a la primera categoría cuando la selección está vacía */
  onBrowse: () => void
}

const CHANNEL = contactChannel()

export function QuotePanel({ open, onClose, onBrowse }: Props) {
  const { groups, count, remove, clear } = useSelection()
  const { dialogRef, initialFocusRef, onKeyDown } = useDialog(open, onClose)
  const [details, setDetails] = useState<QuoteDetails>({ personas: '', fecha: '' })
  const [copied, setCopied] = useState<'idle' | 'ok' | 'fail'>('idle')
  const textRef = useRef<HTMLTextAreaElement>(null)

  const message = useMemo(() => buildQuoteMessage(groups, details), [groups, details])
  const link = useMemo(() => buildContactLink(message), [message])

  // El aviso de copiado se reinicia al cambiar el mensaje
  useEffect(() => setCopied('idle'), [message])

  if (!open) return null

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied('ok')
      return
    } catch {
      // el portapapeles moderno está bloqueado (pasa en navegadores embebidos)
    }
    // Respaldo: seleccionar el texto e intentar la copia clásica
    const el = textRef.current
    if (el) {
      el.focus()
      el.setSelectionRange(0, el.value.length)
      try {
        if (document.execCommand('copy')) {
          setCopied('ok')
          return
        }
      } catch {
        // sin copia automática: queda seleccionado para copiarlo a mano
      }
    }
    setCopied('fail')
  }

  const sendLabel =
    CHANNEL === 'whatsapp' ? QUOTE_COPY.send : CHANNEL === 'email' ? QUOTE_COPY.sendEmail : QUOTE_COPY.sendLink

  return createPortal(
    <div className="quote" onKeyDown={onKeyDown}>
      <div className="quote__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="quote__panel" role="dialog" aria-modal="true" aria-labelledby="quote-title" ref={dialogRef}>
        <header className="quote__head">
          <Logo variant="horizontal" className="quote__logo" />
          <h2 id="quote-title" className="quote__title display">
            {QUOTE_COPY.title}
          </h2>
          <button type="button" className="quote__close" onClick={onClose} ref={initialFocusRef} aria-label="Cerrar">
            <Close />
          </button>
        </header>

        <div className="quote__body">
          {count === 0 ? (
            <div className="quote__empty">
              <p>{QUOTE_COPY.empty}</p>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  onClose()
                  onBrowse()
                }}
              >
                {QUOTE_COPY.emptyCta}
              </button>
            </div>
          ) : (
            <ul className="quote__groups">
              {groups.map((g) => (
                <li key={g.category.id} className="quote__group">
                  <p className="quote__group-title kicker">
                    <span className="quote__group-num">{g.category.number}</span> {g.category.label}
                  </p>
                  <ul className="quote__items">
                    {g.items.map((item) => (
                      <li key={item.id} className="quote__item">
                        <span className="quote__item-name">{item.name}</span>
                        <button
                          type="button"
                          className="quote__remove"
                          onClick={() => remove(item.id)}
                          aria-label={`Quitar ${item.name} de la selección`}
                        >
                          <Minus />
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}

          <div className="quote__fields">
            <label className="quote__field">
              <span className="quote__label">
                {QUOTE_COPY.fields.personas} <em>{QUOTE_COPY.fields.optional}</em>
              </span>
              <input
                type="number"
                min="1"
                inputMode="numeric"
                placeholder="30"
                value={details.personas}
                onChange={(e) => setDetails((d) => ({ ...d, personas: e.target.value }))}
              />
            </label>
            <label className="quote__field">
              <span className="quote__label">
                {QUOTE_COPY.fields.fecha} <em>{QUOTE_COPY.fields.optional}</em>
              </span>
              <input
                type="date"
                value={details.fecha}
                onChange={(e) => setDetails((d) => ({ ...d, fecha: e.target.value }))}
              />
            </label>
          </div>

          <div className="quote__preview">
            <label className="quote__label" htmlFor="quote-message">
              {QUOTE_COPY.preview}
            </label>
            <textarea id="quote-message" ref={textRef} className="quote__text" value={message} readOnly rows={10} />
          </div>
        </div>

        <footer className="quote__foot">
          <p className={`quote__status${copied !== 'idle' ? ' is-visible' : ''}`} role="status" aria-live="polite">
            {copied === 'ok' && (
              <>
                <Check /> {QUOTE_COPY.copied}
              </>
            )}
            {copied === 'fail' && QUOTE_COPY.copyFail}
            {copied === 'idle' && CHANNEL === 'none' && QUOTE_COPY.pending}
            {copied === 'idle' && CHANNEL === 'link' && QUOTE_COPY.formNote}
          </p>
          <div className="quote__actions">
            {link && (
              <a className="btn btn--solid" href={link} target="_blank" rel="noopener noreferrer">
                {sendLabel}
              </a>
            )}
            <button type="button" className={`btn quote__copy ${link ? 'btn--ghost' : 'btn--solid'}`} onClick={copy}>
              <Copy />
              {QUOTE_COPY.copy}
            </button>
          </div>
          {count > 0 && (
            <button type="button" className="quote__clear" onClick={clear}>
              {QUOTE_COPY.clear}
            </button>
          )}
        </footer>
      </div>
    </div>,
    document.body,
  )
}
