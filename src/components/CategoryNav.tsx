import { useEffect, useRef } from 'react'
import { CATEGORIES } from '../content/boquitas'
import { COPY } from '../content/boquitas'
import { Logo } from './Logo'
import './CategoryNav.css'

interface Props {
  active: string | null
}

export function CategoryNav({ active }: Props) {
  const listRef = useRef<HTMLUListElement>(null)

  // Mantiene visible la pestaña activa en la lista horizontal (mobile)
  useEffect(() => {
    if (!active || !listRef.current) return
    const el = listRef.current.querySelector<HTMLElement>(`[data-id="${active}"]`)
    el?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [active])

  return (
    <nav className="catnav" aria-label="Categorías">
      <div className="catnav__inner">
        <a className="catnav__brand" href="#top" aria-label="Volver al inicio">
          <Logo className="catnav__logo" />
        </a>
        <ul className="catnav__list" ref={listRef}>
          {CATEGORIES.map((c) => (
            <li key={c.id} data-id={c.id}>
              <a
                className={`catnav__link${active === c.id ? ' is-active' : ''}`}
                href={`#${c.id}`}
                aria-current={active === c.id ? 'true' : undefined}
              >
                <span className="catnav__num">{c.number}</span>
                {c.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="catnav__cta" href="#cotizar">
          <span className="catnav__cta-long">{COPY.cta.button}</span>
          <span className="catnav__cta-short">Cotizar</span>
        </a>
      </div>
    </nav>
  )
}

/** Índice lateral (solo desktop) */
export function SideIndex({ active }: Props) {
  return (
    <nav className="sideindex" aria-label="Índice">
      <ol>
        {CATEGORIES.map((c) => (
          <li key={c.id}>
            <a className={`sideindex__link${active === c.id ? ' is-active' : ''}`} href={`#${c.id}`}>
              <span className="sideindex__num">{c.number}</span>
              <span className="sideindex__label">{c.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
