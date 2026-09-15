/**
 * Contenido del brochure de boquitas. Fuente única de verdad para textos e imágenes.
 * Para cambiar una foto: agregar los archivos <slug>-480.webp / -960.webp / -1600.webp
 * en public/img y poner `image: '<slug>'` (ver assets-src/build-images.py).
 */
export type CategoryId = 'frias' | 'calientes' | 'dulces'

export interface Boquita {
  id: string
  name: string
  description?: string
  /** slug base de la imagen en public/img (sin sufijo de tamaño) */
  image?: string
  /** texto alternativo de la foto */
  alt?: string
  /** proporción de la foto (ancho/alto) para reservar espacio */
  ratio?: number
}

export interface Category {
  id: CategoryId
  number: string
  label: string
  kicker: string
  intro: string
  items: Boquita[]
}

export const CATEGORIES: Category[] = [
  {
    id: 'frias',
    number: 'I',
    label: 'Frías',
    kicker: 'Frescas y ligeras',
    intro: 'Para abrir la mesa.',
    items: [
      {
        id: 'tartar',
        name: 'Tartar de Atún / Salmón',
        description:
          'Cortado, marinado en soya, jengibre y cebollina, semillas de sésamo tostado y aguacate.',
      },
      {
        id: 'ceviche',
        name: 'Ceviche de pesca blanca',
        description: 'Róbalo fresco curado en leche de tigre de limón y maracuyá.',
      },
      {
        id: 'tostadas',
        name: 'Tostadas Atún / salmón ahumado / jamón serrano',
        description: 'Pan de masa madre tostado en mantequilla.',
        image: 'tostadas',
        alt: 'Tostadas de masa madre con jamón serrano y lascas de queso sobre plato de cerámica',
        ratio: 1374 / 1145,
      },
      {
        id: 'citrus-goat-salad',
        name: 'Citrus Goat Salad',
        description:
          'Mezclum de lechugas hidropónicas y crumble de queso de cabra, vestida con reducción balsámica.',
      },
    ],
  },
  {
    id: 'calientes',
    number: 'II',
    label: 'Calientes',
    kicker: 'Con más energía',
    intro: 'Para que la noche siga.',
    items: [
      {
        id: 'yakitori',
        name: 'Yakitori',
        description: 'Brochetas estilo japonés de pollo, langostinos, filete, pulpo y cerdo.',
        image: 'yakitori',
        alt: 'Brochetas yakitori glaseadas con sésamo y cebollina sobre plato azul',
        ratio: 1,
      },
      {
        id: 'sliders',
        name: 'Cheese Burger Sliders',
        description: 'Carne de res, queso y salsa de la casa.',
      },
      {
        id: 'canastitas',
        name: 'Canastitas de plátano con pork belly',
        description: 'Plátano verde crujiente relleno de cerdo jugoso.',
        image: 'canastitas',
        alt: 'Canastita de plátano verde crujiente con relleno y cilantro',
        ratio: 1,
      },
      {
        id: 'croqueta-pulpo',
        name: 'Croqueta de pulpo',
        description:
          'Base de papas con aceite de oliva, paprika, sal gruesa y trozos de pulpo en alioli de pimentón ahumado.',
      },
      {
        id: 'croquetas-jamon',
        name: 'Croquetas de Jamón Serrano',
        description: 'Base de bechamel y jamón serrano con alioli de ajo negro ahumado.',
      },
      {
        id: 'carimanola',
        name: 'Carimañola con queso',
        description: 'Tradicionales rellenas de queso del país.',
        image: 'carimanola',
        alt: 'Carimañolas doradas abiertas con queso derretido y salsa',
        ratio: 1,
      },
      {
        id: 'wings',
        name: 'Wings',
        description: 'Bañadas en salsa Búfalo o Teriyaki casera.',
      },
      {
        id: 'wanton',
        name: 'Wanton de camarón',
        description: 'Crujientes, rellenos de camarón sazonado en salsa agridulce.',
      },
    ],
  },
  {
    id: 'dulces',
    number: 'III',
    label: 'Dulces',
    kicker: 'Para cerrar',
    intro: 'El final que se queda.',
    items: [
      { id: 'cheesecake', name: 'Cheesecake de maracuyá', image: 'cheesecake', alt: 'Porción de cheesecake con salsa de maracuyá', ratio: 480 / 450 },
      { id: 'mousse', name: 'Mousse de Chocolate', image: 'mousse', alt: 'Mousse de chocolate con virutas de cacao', ratio: 461 / 460 },
      { id: 'brownie', name: 'Brownie', image: 'brownie', alt: 'Brownie con helado y salsa de chocolate', ratio: 471 / 490 },
      { id: 'tres-leches', name: 'Tres leches', image: 'tres-leches', alt: 'Tres leches con crema, canela y fresa', ratio: 520 / 490 },
      { id: 'tartaletas', name: 'Tartaletas', image: 'tartaletas', alt: 'Tartaletas de limón, frutos rojos y chocolate', ratio: 480 / 530 },
      { id: 'flan', name: 'Flan de coco', image: 'flan', alt: 'Flan de coco con caramelo y coco rallado', ratio: 481 / 510 },
    ],
  },
]

/** Imágenes de ambiente (no ligadas a un producto) */
export const AMBIENT = {
  hero: { image: 'mesa-amigos', alt: 'Amigos compartiendo boquitas y cócteles alrededor de una mesa en Tío Navaja', ratio: 1536 / 1024 },
  calientes: { image: 'calientes-ambiente', alt: 'Persona disfrutando una brocheta yakitori en el bar', ratio: 1024 / 1536 },
  postres: { image: 'postres', alt: 'Mesa con seis postres de Tío Navaja vistos desde arriba', ratio: 941 / 1672 },
}

export const COPY = {
  hero: {
    title: 'Boquitas',
    subtitle: 'Para compartir, celebrar y hacer de cualquier encuentro una buena excusa para quedarse.',
    cta: 'Explorar boquitas',
  },
  intro: {
    title: 'Para compartir sin complicaciones',
    p1: 'En Tío Navaja creemos que una buena reunión empieza alrededor de la mesa.',
    p2: 'Por eso creamos una selección de boquitas pensadas para compartir, acompañar una buena conversación y disfrutar cada momento.',
  },
  cta: {
    title: 'Tu evento, al estilo Tío Navaja',
    p1: 'Desde una reunión íntima hasta una celebración con todo el equipo.',
    p2: 'Nosotros ponemos la mesa, la cocina y el ambiente.',
    button: 'Quiero cotizar',
    pending: 'Estamos confirmando el canal de contacto. Muy pronto podrás cotizar desde aquí.',
  },
}
