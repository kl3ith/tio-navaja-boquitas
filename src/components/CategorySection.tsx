import type { Boquita, Category } from '../content/boquitas'
import { AMBIENT } from '../content/boquitas'
import { BoquitaCard, type Variant } from './BoquitaCard'
import { Picture } from './Picture'
import { useParallax } from '../hooks/useParallax'
import './CategorySection.css'

interface Props {
  category: Category
  onOpen: (item: Boquita) => void
}

/* Reparto editorial: variante por posición para cada categoría */
const LAYOUT: Record<string, Variant[]> = {
  frias: ['type', 'type', 'feature', 'type'],
  calientes: ['feature', 'type', 'photo', 'type', 'type', 'photo', 'type', 'type'],
  dulces: ['row', 'row', 'row', 'row', 'row', 'row'],
}
const NOTES: Record<string, Record<string, string>> = {
  frias: { tostadas: 'masa madre', ceviche: 'leche de tigre' },
  calientes: { yakitori: 'a la brasa', carimanola: 'de la casa' },
  dulces: {},
}
const THEME: Record<string, string> = {
  frias: 'theme-bone',
  calientes: 'theme-ember',
  dulces: 'theme-plum',
}

export function CategorySection({ category, onOpen }: Props) {
  const ambientRef = useParallax<HTMLDivElement>(0.06)
  const layout = LAYOUT[category.id]
  const notes = NOTES[category.id]

  return (
    <section
      className={`cat cat--${category.id} section ${THEME[category.id]}`}
      id={category.id}
      aria-labelledby={`${category.id}-title`}
    >
      <div className="wrap">
        <header className="cat__head">
          <p className="cat__chapter kicker reveal">
            Capítulo {category.number} <span className="cat__chapter-sep">·</span> {category.kicker}
          </p>
          <h2 id={`${category.id}-title`} className="cat__title display reveal">
            {category.label}
          </h2>
          <p className="cat__intro script reveal" aria-hidden="true">
            {category.intro}
          </p>
          <p className="cat__count reveal">
            {category.items.length} {category.items.length === 1 ? 'boquita' : 'boquitas'}
          </p>
        </header>

        {category.id === 'calientes' && (
          <div className="cat__ambient reveal" ref={ambientRef}>
            <Picture name={AMBIENT.calientes.image} alt={AMBIENT.calientes.alt} sizes="(max-width: 1024px) 60vw, 34vw" />
            <span className="cat__ambient-tag script" aria-hidden="true">
              que la noche siga
            </span>
          </div>
        )}

        {category.id === 'dulces' && (
          <div className="cat__flatlay reveal">
            <Picture name={AMBIENT.postres.image} alt={AMBIENT.postres.alt} sizes="(max-width: 1024px) 100vw, 40vw" />
            <span className="cat__flatlay-tag kicker" aria-hidden="true">
              Los seis, en una mesa
            </span>
          </div>
        )}

        <div className="cat__grid">
          {category.items.map((item, i) => (
            <BoquitaCard
              key={item.id}
              item={item}
              index={i + 1}
              variant={layout[i] ?? 'type'}
              note={notes[item.id]}
              onOpen={onOpen}
              style={{ ['--reveal-delay' as string]: `${(i % 4) * 70}ms` }}
              sizes={
                layout[i] === 'feature'
                  ? '(max-width: 1024px) 100vw, 56vw'
                  : layout[i] === 'row'
                    ? '140px'
                    : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
