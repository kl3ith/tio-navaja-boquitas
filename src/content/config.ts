/**
 * Configuración de contacto.
 *
 * CONTACT_URL es el canal al que se envía la cotización. El mensaje con la
 * selección de boquitas se arma solo y se adjunta automáticamente a este enlace:
 *   - WhatsApp: se agrega como parámetro `text`
 *   - Email (mailto:): se agrega como cuerpo del correo
 *   - Cualquier otro enlace (formulario): se abre tal cual y el cliente copia el mensaje
 *
 * Mientras esté vacío, el panel de cotización sigue funcionando: arma el mensaje
 * y ofrece copiarlo, sin enlaces rotos.
 *
 * Ejemplos válidos cuando se confirme el dato:
 *   WhatsApp:   "https://wa.me/507XXXXXXXX"
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
