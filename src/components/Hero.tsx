import { Picture } from './Picture'
import { Logo } from './Logo'
import { ArrowDown } from './Icons'
import { AMBIENT, COPY } from '../content/boquitas'
import { SITE } from '../content/config'
import { useParallax } from '../hooks/useParallax'
import './Hero.css'

export function Hero() {
  const img = useParallax<HTMLDivElement>(0.12)
  return (
    <header className="hero theme-night" id="top">
      <div className="hero__media" ref={img}>
        <Picture name={AMBIENT.hero.image} alt={AMBIENT.hero.alt} sizes="100vw" priority className="hero__img" />
      </div>
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__top">
        <Logo className="hero__logo" />
      </div>

      <div className="hero__body wrap">
        <p className="hero__kicker kicker">Para eventos</p>
        <h1 className="hero__title display">
          <span className="hero__title-word">{COPY.hero.title}</span>
          <span className="hero__note script" aria-hidden="true">
            para compartir
          </span>
        </h1>
        <p className="hero__sub">{COPY.hero.subtitle}</p>
        <a className="btn btn--solid hero__cta" href="#intro">
          {COPY.hero.cta}
          <ArrowDown />
        </a>
      </div>

      <p className="hero__side" aria-hidden="true">
        {SITE.place}
      </p>
      <p className="hero__corner" aria-hidden="true">
        № 01 — Brochure
      </p>
    </header>
  )
}
