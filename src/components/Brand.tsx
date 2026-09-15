/**
 * Elementos gráficos de la marca (logos, navajas, el Tío, palmeras).
 * Los recortes con `mask` toman el color de `currentColor`; los de color propio van como <img>.
 */
import logoStack from '../assets/brand/logo-stack.webp'
import logoHorizontal from '../assets/brand/logo-horizontal.webp'
import logoScript from '../assets/brand/logo-script.webp'
import navaja1 from '../assets/brand/navaja1.webp'
import navaja2 from '../assets/brand/navaja2.webp'
import navaja3 from '../assets/brand/navaja3.webp'
import navaja4 from '../assets/brand/navaja4.webp'
import navaja5 from '../assets/brand/navaja5.webp'
import navaja6 from '../assets/brand/navaja6.webp'
import palmeras from '../assets/brand/palmeras.webp'
import tio1 from '../assets/brand/tio1.webp'
import tio2 from '../assets/brand/tio2.webp'
import bombilla from '../assets/brand/bombilla.webp'
import './Brand.css'

const ART = {
  'logo-stack': { src: logoStack, ratio: 1200 / 663 },
  'logo-horizontal': { src: logoHorizontal, ratio: 1200 / 256 },
  'logo-script': { src: logoScript, ratio: 1200 / 221 },
  navaja1: { src: navaja1, ratio: 900 / 1116 },
  navaja2: { src: navaja2, ratio: 900 / 1245 },
  navaja3: { src: navaja3, ratio: 900 / 1099 },
  navaja4: { src: navaja4, ratio: 900 / 1171 },
  navaja5: { src: navaja5, ratio: 900 / 1185 },
  navaja6: { src: navaja6, ratio: 900 / 1149 },
  palmeras: { src: palmeras, ratio: 900 / 1087 },
  tio1: { src: tio1, ratio: 900 / 1626 },
  tio2: { src: tio2, ratio: 900 / 1652 },
  bombilla: { src: bombilla, ratio: 900 / 884 },
} as const

export type ArtName = keyof typeof ART

interface LogoProps {
  variant?: 'stack' | 'horizontal' | 'script'
  className?: string
  label?: string
}

/** Logo de marca, recoloreable con `color`. */
export function Logo({ variant = 'horizontal', className = '', label = 'Tío Navaja · El Cangrejo' }: LogoProps) {
  const art = ART[`logo-${variant}`]
  return (
    <span
      className={`logo logo--${variant} ${className}`}
      role="img"
      aria-label={label}
      style={{ ['--art' as string]: `url(${art.src})`, aspectRatio: art.ratio }}
    />
  )
}

interface CutoutProps {
  name: ArtName
  /** true: usa el recorte como máscara y toma `currentColor` */
  mask?: boolean
  className?: string
  style?: React.CSSProperties
}

/** Elemento gráfico decorativo (siempre oculto para lectores de pantalla). */
export function Cutout({ name, mask = false, className = '', style }: CutoutProps) {
  const art = ART[name]
  if (mask) {
    return (
      <span
        className={`cutout cutout--mask ${className}`}
        aria-hidden="true"
        style={{ ['--art' as string]: `url(${art.src})`, aspectRatio: art.ratio, ...style }}
      />
    )
  }
  return (
    <img
      className={`cutout ${className}`}
      src={art.src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable={false}
      style={{ aspectRatio: art.ratio, ...style }}
    />
  )
}
