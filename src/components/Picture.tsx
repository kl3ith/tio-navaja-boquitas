import manifest from '../content/images.json'

type Manifest = Record<string, { sources: { file: string; w: number }[]; ratio: number }>
const IMAGES = manifest as Manifest
const BASE = import.meta.env.BASE_URL

interface Props {
  name: string
  alt: string
  /** atributo sizes; por defecto ancho de viewport hasta 640px */
  sizes?: string
  className?: string
  /** true para la imagen del hero (carga inmediata) */
  priority?: boolean
}

export function Picture({ name, alt, sizes = '(max-width: 640px) 100vw, 50vw', className, priority }: Props) {
  const entry = IMAGES[name]
  if (!entry) return null
  const srcSet = entry.sources.map((s) => `${BASE}img/${s.file} ${s.w}w`).join(', ')
  const largest = entry.sources[entry.sources.length - 1]
  const w = largest.w
  const h = Math.round(w / entry.ratio)
  return (
    <img
      className={className}
      src={`${BASE}img/${largest.file}`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={w}
      height={h}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      draggable={false}
    />
  )
}

export function hasImage(name?: string) {
  return !!name && !!IMAGES[name]
}
