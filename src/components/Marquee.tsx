import { Cutout } from './Brand'
import './Marquee.css'

const WORDS = ['Boquitas', 'Tío Navaja', 'El Cangrejo', 'Para compartir', 'Para celebrar', 'Para quedarse']

export function Marquee({ className = '' }: { className?: string }) {
  const track = (hidden: boolean) => (
    <span className="marquee__track" aria-hidden={hidden || undefined}>
      {WORDS.map((w, i) => (
        <span className="marquee__item" key={i}>
          <span className="marquee__word">{w}</span>
          <Cutout name="navaja4" mask className="marquee__sep" />
        </span>
      ))}
    </span>
  )
  return (
    <div className={`marquee ${className}`} role="presentation">
      {track(false)}
      {track(true)}
    </div>
  )
}
