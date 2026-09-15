/**
 * Armado automático del mensaje de cotización a partir de la selección.
 * Todo ocurre en el navegador: nada se envía a ningún servidor.
 */
import type { Boquita, Category } from './boquitas'
import { CONTACT_URL } from './config'

export interface QuoteDetails {
  /** cantidad aproximada de personas */
  personas: string
  /** fecha tentativa en formato YYYY-MM-DD (input date) */
  fecha: string
}

export interface QuoteGroup {
  category: Category
  items: Boquita[]
}

export const QUOTE_COPY = {
  title: 'Mi selección',
  empty: 'Todavía no has elegido boquitas. Toca «Agregar» en las que te interesen y aquí se arma solo el mensaje.',
  emptyCta: 'Ver las boquitas',
  fields: {
    personas: 'Personas aproximadas',
    fecha: 'Fecha tentativa',
    optional: 'Opcional',
  },
  preview: 'Mensaje que vas a enviar',
  send: 'Enviar por WhatsApp',
  sendEmail: 'Enviar por correo',
  sendLink: 'Ir al formulario',
  copy: 'Copiar mensaje',
  copied: 'Mensaje copiado',
  copyFail: 'No se pudo copiar. Selecciona el texto y cópialo a mano.',
  clear: 'Vaciar selección',
  pending:
    'Todavía no hay un canal de contacto configurado. Copia el mensaje y envíalo por el medio que prefieras.',
  formNote: 'El formulario no admite texto precargado: copia el mensaje antes de abrirlo.',
}

/** Fecha YYYY-MM-DD → "12 de octubre de 2026" sin depender de la zona horaria. */
function formatFecha(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!m) return iso
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ]
  const mes = meses[Number(m[2]) - 1]
  if (!mes) return iso
  return `${Number(m[3])} de ${mes} de ${m[1]}`
}

/** Construye el texto del mensaje a partir de la selección y los datos opcionales. */
export function buildQuoteMessage(groups: QuoteGroup[], details: QuoteDetails): string {
  const lines: string[] = ['Hola, les escribo desde el brochure de boquitas de Tío Navaja.']

  if (groups.length) {
    lines.push('', 'Esta es la selección que me interesa para un evento:')
    for (const g of groups) {
      lines.push('', `${g.category.label.toUpperCase()}`)
      for (const item of g.items) lines.push(`· ${item.name}`)
    }
  } else {
    lines.push('', 'Me interesa cotizar boquitas para un evento.')
  }

  const personas = details.personas.trim()
  const fecha = details.fecha.trim()
  if (personas || fecha) {
    lines.push('')
    if (personas) lines.push(`Personas aproximadas: ${personas}`)
    if (fecha) lines.push(`Fecha tentativa: ${formatFecha(fecha)}`)
  }

  lines.push('', '¿Me pueden enviar una cotización? Gracias.')
  return lines.join('\n')
}

export type ContactChannel = 'whatsapp' | 'email' | 'link' | 'none'

/** Detecta qué tipo de canal es CONTACT_URL para saber cómo adjuntar el mensaje. */
export function contactChannel(url: string = CONTACT_URL): ContactChannel {
  if (!url.trim()) return 'none'
  if (/^mailto:/i.test(url)) return 'email'
  if (/(?:wa\.me|whatsapp\.com)/i.test(url)) return 'whatsapp'
  return 'link'
}

/**
 * Devuelve el enlace final con el mensaje adjunto según el canal.
 * Para un formulario genérico devuelve la URL sin tocar (no admite texto precargado).
 */
export function buildContactLink(message: string, url: string = CONTACT_URL): string | null {
  const channel = contactChannel(url)
  if (channel === 'none') return null
  const base = url.split('#')[0]
  const sep = base.includes('?') ? '&' : '?'
  if (channel === 'whatsapp') return `${base}${sep}text=${encodeURIComponent(message)}`
  if (channel === 'email') return `${base}${sep}body=${encodeURIComponent(message)}`
  return url
}
