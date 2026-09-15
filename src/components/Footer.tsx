import { Logo } from './Logo'
import { Instagram, WhatsApp, Phone } from './Icons'
import { CONTACT, SITE } from '../content/config'
import './Footer.css'

export function Footer() {
  const links = [
    CONTACT.instagram && { key: 'ig', href: CONTACT.instagram, label: 'Instagram', icon: <Instagram /> },
    CONTACT.whatsapp && { key: 'wa', href: CONTACT.whatsapp, label: 'WhatsApp', icon: <WhatsApp /> },
    CONTACT.phone && { key: 'tel', href: `tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`, label: CONTACT.phone, icon: <Phone /> },
  ].filter(Boolean) as { key: string; href: string; label: string; icon: React.ReactNode }[]

  return (
    <footer className="footer" role="contentinfo">
      <div className="wrap footer__inner">
        <Logo className="footer__logo" />
        <p className="footer__place">
          <span className="footer__name">{SITE.name}</span>
          <span className="footer__sep" aria-hidden="true" />
          <span>{SITE.place}</span>
        </p>
        {links.length > 0 && (
          <ul className="footer__links" aria-label="Contacto">
            {links.map((l) => (
              <li key={l.key}>
                <a className="footer__link" href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  {l.icon}
                  <span>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className="footer__fine">Boquitas para eventos</p>
      </div>
    </footer>
  )
}
