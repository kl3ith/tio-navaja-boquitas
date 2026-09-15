import { Picture } from './Picture'
import { Cutout } from './Brand'
import { ArrowRight } from './Icons'
import { CATEGORIES, COPY } from '../content/boquitas'
import './Intro.css'

const TILE_IMAGE: Record<string, { image: string; alt: string }> = {
  frias: { image: 'tostadas', alt: 'Tostadas de jamón serrano' },
  calientes: { image: 'yakitori', alt: 'Brochetas yakitori' },
  dulces: { image: 'cheesecake', alt: 'Cheesecake de maracuyá' },
}

export function Intro() {
  return (
    <section className="intro section theme-bone" id="intro" aria-labelledby="intro-title">
      <Cutout name="tio1" mask className="intro__tio" />
      <div className="wrap intro__grid">
        <div className="intro__text">
          <p className="kicker reveal">Bienvenida</p>
          <h2 id="intro-title" className="intro__title display reveal">
            {COPY.intro.title}
          </h2>
          <p className="intro__p intro__p--lead reveal">{COPY.intro.p1}</p>
          <p className="intro__p reveal">{COPY.intro.p2}</p>
        </div>

        <ol className="intro__tiles" aria-label="Categorías de boquitas">
          {CATEGORIES.map((c, i) => (
            <li className={`intro__tile intro__tile--${c.id} reveal`} style={{ ['--reveal-delay' as string]: `${i * 90}ms` }} key={c.id}>
              <a className="intro__tile-link" href={`#${c.id}`}>
                <span className="intro__tile-num display">{c.number}</span>
                <span className="intro__tile-media">
                  <Picture name={TILE_IMAGE[c.id].image} alt={TILE_IMAGE[c.id].alt} sizes="(max-width: 640px) 40vw, 20vw" />
                </span>
                <span className="intro__tile-label display">{c.label}</span>
                <span className="intro__tile-kicker">
                  {c.kicker}
                  <ArrowRight />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
