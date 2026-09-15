import { COPY } from '../content/boquitas'
import { ArrowRight } from './Icons'
import { Cutout, Logo } from './Brand'
import { useSelection } from '../hooks/useSelection'
import './Cta.css'

export function Cta({ onQuote }: { onQuote: () => void }) {
  const { count } = useSelection()
  return (
    <section className="cta section theme-petrol" id="cotizar" aria-labelledby="cta-title">
      <div className="cta__pattern" aria-hidden="true" />
      <Cutout name="tio2" mask className="cta__tio" />
      <Cutout name="navaja4" className="cta__knife" />
      <div className="wrap cta__inner">
        <Logo variant="script" className="cta__signature reveal" label="Tío Navaja" />
        <p className="kicker reveal">Eventos</p>
        <h2 id="cta-title" className="cta__title display reveal">
          {COPY.cta.title}
        </h2>
        <p className="cta__p reveal">{COPY.cta.p1}</p>
        <p className="cta__p cta__p--strong reveal">{COPY.cta.p2}</p>
        <div className="cta__action reveal">
          <button type="button" className="btn btn--solid" onClick={onQuote}>
            {COPY.cta.button}
            <ArrowRight />
          </button>
          <p className="cta__hint">
            {count > 0
              ? `Ya elegiste ${count} ${count === 1 ? 'boquita' : 'boquitas'}: armamos el mensaje por ti.`
              : 'Elige tus boquitas y armamos el mensaje por ti.'}
          </p>
        </div>
      </div>
    </section>
  )
}
