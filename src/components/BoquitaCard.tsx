import type { Boquita } from '../content/boquitas'
import { Picture } from './Picture'
import { Plus } from './Icons'
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
  return (
    <article
      className={`card card--${variant} ${withPhoto ? 'card--has-photo' : 'card--typo'} reveal ${className}`}
      style={style}
    >
      {withPhoto && (
        <div className="card__media">
          <Picture name={item.image!} alt={item.alt ?? item.name} sizes={sizes} />
        </div>
      )}
      {!withPhoto && variant !== 'row' && (
        <div className="card__typo" aria-hidden="true">
          <span className="card__typo-big display display-italic">{item.name.split(' ')[0]}</span>
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
        <span className="card__more" aria-hidden="true">
          <Plus />
        </span>
      </div>
    </article>
  )
}
