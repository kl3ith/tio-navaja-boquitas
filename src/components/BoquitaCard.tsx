import type { Boquita } from '../content/boquitas'
import { Picture } from './Picture'
import { AddButton } from './AddButton'
import { useSelection } from '../hooks/useSelection'
import './BoquitaCard.css'

export type Variant = 'feature' | 'photo' | 'type' | 'row'

interface Props {
  item: Boquita
  index: number
  variant: Variant
  onOpen: (item: Boquita) => void
  /** anotación script opcional */
  note?: string
  sizes?: string
  style?: React.CSSProperties
  className?: string
}

const pad = (n: number) => String(n).padStart(2, '0')

export function BoquitaCard({ item, index, variant, onOpen, note, sizes, style, className = '' }: Props) {
  const withPhoto = !!item.image
  const { has } = useSelection()
  const selected = has(item.id)
  return (
    <article
      /* El estado va en data-selected y no en className: la animación de entrada
         añade `is-in` por fuera de React y un className dinámico la borraría. */
      className={`card card--${variant} ${withPhoto ? 'card--has-photo' : 'card--typo'} reveal ${className}`}
      data-selected={selected || undefined}
      style={style}
    >
      {withPhoto && (
        <div className="card__media">
          <Picture name={item.image!} alt={item.alt ?? item.name} sizes={sizes} />
        </div>
      )}
      {!withPhoto && variant !== 'row' && (
        <div className="card__typo" aria-hidden="true">
          <span className="card__typo-big script-big">{item.name.split(' ')[0]}</span>
        </div>
      )}
      <div className="card__body">
        <span className="card__num">{pad(index)}</span>
        <h3 className="card__name display">
          <button
            type="button"
            className="card__btn"
            onClick={() => onOpen(item)}
            aria-label={`${item.name}. Ver detalle`}
          >
            {item.name}
          </button>
        </h3>
        {variant === 'row' && <span className="card__leader" aria-hidden="true" />}
        {item.description && <p className="card__desc">{item.description}</p>}
        {note && (
          <span className="card__note script" aria-hidden="true">
            {note}
          </span>
        )}
        <AddButton item={item} />
      </div>
    </article>
  )
}
