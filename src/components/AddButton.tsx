import type { Boquita } from '../content/boquitas'
import { useSelection } from '../hooks/useSelection'
import { Check, Plus } from './Icons'

interface Props {
  item: Boquita
  className?: string
}

/**
 * Agrega o quita una boquita de la selección. El nombre del plato va oculto
 * dentro del botón para que el nombre accesible sea "Agregar Yakitori".
 */
export function AddButton({ item, className = '' }: Props) {
  const { has, toggle } = useSelection()
  const selected = has(item.id)
  return (
    <button
      type="button"
      className={`addbtn${selected ? ' is-on' : ''} ${className}`}
      onClick={() => toggle(item.id)}
      aria-pressed={selected}
    >
      <span className="addbtn__icon" aria-hidden="true">{selected ? <Check /> : <Plus />}</span>
      <span className="addbtn__label">{selected ? 'Agregada' : 'Agregar'}</span>
      <span className="visually-hidden"> {item.name}</span>
    </button>
  )
}
