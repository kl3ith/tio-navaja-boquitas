import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CATEGORIES, type Boquita, type Category } from '../content/boquitas'

const STORAGE_KEY = 'tn-boquitas-seleccion'
const VALID_IDS = new Set(CATEGORIES.flatMap((c) => c.items.map((i) => i.id)))

export interface SelectionGroup {
  category: Category
  items: Boquita[]
}

interface SelectionValue {
  ids: string[]
  count: number
  has: (id: string) => boolean
  toggle: (id: string) => void
  remove: (id: string) => void
  clear: () => void
  /** selección agrupada por categoría, en el orden del brochure */
  groups: SelectionGroup[]
}

const SelectionContext = createContext<SelectionValue | null>(null)

function read(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id): id is string => typeof id === 'string' && VALID_IDS.has(id))
  } catch {
    // almacenamiento bloqueado o datos corruptos: se empieza vacío
    return []
  }
}

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>(read)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // sin almacenamiento la selección sigue funcionando en memoria
    }
  }, [ids])

  const has = useCallback((id: string) => ids.includes(id), [ids])
  const toggle = useCallback(
    (id: string) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [],
  )
  const remove = useCallback((id: string) => setIds((prev) => prev.filter((x) => x !== id)), [])
  const clear = useCallback(() => setIds([]), [])

  const groups = useMemo(() => {
    const set = new Set(ids)
    return CATEGORIES.map((category) => ({
      category,
      items: category.items.filter((i) => set.has(i.id)),
    })).filter((g) => g.items.length > 0)
  }, [ids])

  const value = useMemo<SelectionValue>(
    () => ({ ids, count: ids.length, has, toggle, remove, clear, groups }),
    [ids, has, toggle, remove, clear, groups],
  )

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>
}

export function useSelection(): SelectionValue {
  const ctx = useContext(SelectionContext)
  if (!ctx) throw new Error('useSelection debe usarse dentro de <SelectionProvider>')
  return ctx
}
