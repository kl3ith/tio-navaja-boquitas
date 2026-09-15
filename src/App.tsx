import { useCallback, useMemo, useRef, useState } from 'react'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Intro } from './components/Intro'
import { CategoryNav, SideIndex } from './components/CategoryNav'
import { CategorySection } from './components/CategorySection'
import { Modal } from './components/Modal'
import { Cta } from './components/Cta'
import { Footer } from './components/Footer'
import { CATEGORIES, type Boquita } from './content/boquitas'
import { useRevealAll } from './hooks/useReveal'
import { useScrollSpy } from './hooks/useScrollSpy'
import './App.css'

const IDS = CATEGORIES.map((c) => c.id)

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Boquita | null>(null)
  useRevealAll(rootRef)
  const active = useScrollSpy(IDS)

  const open = useCallback((item: Boquita) => setSelected(item), [])
  const close = useCallback(() => setSelected(null), [])
  const selectedCategory = useMemo(
    () => (selected ? CATEGORIES.find((c) => c.items.some((i) => i.id === selected.id)) ?? null : null),
    [selected],
  )

  return (
    <div className="app" ref={rootRef}>
      <a className="skip" href="#intro">
        Saltar al contenido
      </a>
      <Hero />
      <Marquee />
      <CategoryNav active={active} />
      <SideIndex active={active} />
      <main id="main">
        <Intro />
        {CATEGORIES.map((c) => (
          <CategorySection key={c.id} category={c} onOpen={open} />
        ))}
        <Cta />
      </main>
      <Footer />
      <Modal item={selected} category={selectedCategory} onClose={close} />
    </div>
  )
}
