import { useState } from 'react'
import { COPY } from '../content/boquitas'
import { CONTACT_URL } from '../content/config'
import { ArrowRight } from './Icons'
import { Cutout, Logo } from './Brand'
import './Cta.css'

export function Cta() {
  const [pending, setPending] = useState(false)
  const external = /^https?:/i.test(CONTACT_URL)
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
          {CONTACT_URL ? (
            <a
              className="btn btn--solid"
              href={CONTACT_URL}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
              {COPY.cta.button}
              <ArrowRight />
            </a>
          ) : (
            <>
              <button type="button" className="btn btn--solid" onClick={() => setPending(true)} aria-describedby="cta-pending">
                {COPY.cta.button}
                <ArrowRight />
              </button>
              <p id="cta-pending" className={`cta__pending${pending ? ' is-visible' : ''}`} role="status" aria-live="polite">
                {pending ? COPY.cta.pending : ''}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
