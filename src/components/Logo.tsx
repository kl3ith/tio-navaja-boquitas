import logoUrl from '../assets/logo.svg'
import './Logo.css'

/** Logo Tío Navaja · El Cangrejo (vectorizado del brochure). Toma el color de `currentColor` vía mask. */
export function Logo({ className = '', label = 'Tío Navaja · El Cangrejo' }: { className?: string; label?: string }) {
  return <span className={`logo ${className}`} role="img" aria-label={label} style={{ ['--logo' as string]: `url(${logoUrl})` }} />
}
