import { createPortal } from 'react-dom'
import type { Boquita, Category } from '../content/boquitas'
import { Picture } from './Picture'
import { Close } from './Icons'
import { AddButton } from './AddButton'
import { useDialog } from '../hooks/useDialog'
import './Modal.css'

interface Props {
  item: Boquita | null
  category: Category | null
  onClose: () => void
}

export function Modal({ item, category, onClose }: Props) {
  const { dialogRef, initialFocusRef, onKeyDown } = useDialog(!!item, onClose)

  if (!item) return null
  const idx = category ? category.items.findIndex((i) => i.id === item.id) + 1 : 0

  return createPortal(
    <div className={`modal ${category ? `modal--${category.id}` : ''}`} onKeyDown={onKeyDown}>
      <div className="modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={item.description ? 'modal-desc' : undefined}
        ref={dialogRef}
      >
        <button type="button" className="modal__close" onClick={onClose} ref={initialFocusRef} aria-label="Cerrar">
          <Close />
        </button>
        <div className="modal__media">
          {item.image ? (
            <Picture name={item.image} alt={item.alt ?? item.name} sizes="(max-width: 900px) 100vw, 55vw" />
          ) : (
            <div className="modal__typo" aria-hidden="true">
              <span className="modal__typo-num display">{String(idx).padStart(2, '0')}</span>
              <span className="modal__typo-word script-big">{item.name}</span>
            </div>
          )}
        </div>
        <div className="modal__body">
          {category && (
            <p className="modal__kicker kicker">
              {category.label} <span aria-hidden="true">·</span> {String(idx).padStart(2, '0')} /{' '}
              {String(category.items.length).padStart(2, '0')}
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
          <AddButton item={item} className="modal__add" />
          <hr className="rule modal__rule" />
          <p className="modal__foot">Tío Navaja · El Cangrejo</p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
