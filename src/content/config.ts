/**
 * Configuración de contacto y CTA.
 * Todavía no existe un dato confirmado: dejar CONTACT_URL vacío hace que el botón
 * "Quiero cotizar" muestre un aviso configurable en lugar de un enlace roto.
 *
 * Ejemplos válidos cuando se confirme el dato:
 *   WhatsApp:   "https://wa.me/507XXXXXXXX?text=Hola%2C%20quiero%20cotizar%20boquitas%20para%20un%20evento"
 *   Email:      "mailto:eventos@ejemplo.com?subject=Cotizaci%C3%B3n%20de%20boquitas"
 *   Formulario: "https://..."
 */
export const CONTACT_URL = ''

/** Redes y teléfono del footer. Dejar en '' para ocultar el ítem. */
export const CONTACT = {
  instagram: '', // ej. "https://instagram.com/usuario"
  whatsapp: '',  // ej. "https://wa.me/507XXXXXXXX"
  phone: '',     // ej. "+507 000-0000"
}

export const SITE = {
  name: 'Tío Navaja',
  place: 'El Cangrejo · Panamá',
  title: 'Tío Navaja | Boquitas para Eventos',
  description:
    'Boquitas de Tío Navaja para compartir, celebrar y hacer de cualquier encuentro una buena excusa para quedarse. Frías, calientes y dulces para tu evento.',
}
