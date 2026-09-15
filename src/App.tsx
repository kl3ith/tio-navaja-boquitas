import { useCallback, useMemo, useRef, useState } from 'react'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Intro } from './components/Intro'
import { CategoryNav, SideIndex } from './components/CategoryNav'
import { CategorySection } from './components/CategorySection'
import { Modal } from './components/Modal'
import { Cta } from './components/Cta'
import { Footer } from './components/Footer'
import { SelectionBar } from './components/SelectionBar'
import { QuotePanel } from './components/QuotePanel'
import { CATEGORIES, type Boquita } from './content/boquitas'
import { SelectionProvider } from './hooks/useSelection'
import { useRevealAll } from './hooks/useReveal'
import { useScrollSpy } from './hooks/useScrollSpy'
import './App.css'

const IDS = CATEGORIES.map((c) => c.id)

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Boquita | null>(null)
  const [quoteOpen, setQuoteOpen] = useState(false)
  useRevealAll(rootRef)
  const active = useScrollSpy(IDS)

  const open = useCallback((item: Boquita) => setSelected(item), [])
  const close = useCallback(() => setSelected(null), [])
  // Un solo diálogo a la vez: abrir la cotización cierra el detalle
  const openQuote = useCallback(() => {
    setSelected(null)
    setQuoteOpen(true)
  }, [])
  const closeQuote = useCallback(() => setQuoteOpen(false), [])
  const browse = useCallback(() => {
    document.getElementById('frias')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const selectedCategory = useMemo(
    () => (selected ? CATEGORIES.find((c) => c.items.some((i) => i.id === selected.id)) ?? null : null),
    [selected],
  )

  return (
    <SelectionProvider>
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
          <Cta onQuote={openQuote} />
        </main>
        <Footer />
        <SelectionBar onOpen={openQuote} />
      </div>
      <Modal item={selected} category={selectedCategory} onClose={close} />
      <QuotePanel open={quoteOpen} onClose={closeQuote} onBrowse={browse} />
    </SelectionProvider>
  )
}
