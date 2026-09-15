import { useEffect, useState } from 'react'

/** Devuelve el id de la sección más visible entre los ids dados. */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!els.length || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) {
          setActive(visible[0].target.id)
        } else {
          // Si ninguna intersecta en la franja central, mantener la última.
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [ids])
  return active
}
