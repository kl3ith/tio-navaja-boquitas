import { useSelection } from '../hooks/useSelection'
import { ArrowRight } from './Icons'
import './SelectionBar.css'

/** Barra flotante: aparece al elegir la primera boquita y abre el panel de cotización. */
export function SelectionBar({ onOpen }: { onOpen: () => void }) {
  const { count } = useSelection()
  const visible = count > 0
  return (
    <div className={`selbar${visible ? ' is-visible' : ''}`} hidden={!visible}>
      <div className="selbar__inner">
        <p className="selbar__count" role="status" aria-live="polite">
          <span className="selbar__num">{count}</span>
          <span>{count === 1 ? 'boquita elegida' : 'boquitas elegidas'}</span>
        </p>
        <button type="button" className="btn btn--solid selbar__btn" onClick={onOpen}>
          Armar cotización
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}
