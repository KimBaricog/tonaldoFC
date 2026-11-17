import { useCallback, useEffect, useState } from 'react'
import { fetchCoaches } from '../../services/coachService'
import { reorderCoaches } from '../../services/coachAdminService'
import CoachForm from './CoachForm'
import CoachCard from './CoachCard'

export default function CoachManager() {
  const [coaches, setCoaches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const reload = useCallback(async () => {
    try { setCoaches(await fetchCoaches()); setError(false) } catch { setError(true) } finally { setLoading(false) }
  }, [])
  useEffect(() => { reload() }, [reload])

  const move = async (index, step) => {
    const list = [...coaches]
    const target = index + step
    if (target < 0 || target >= list.length) return
    ;[list[index], list[target]] = [list[target], list[index]]
    try { await reorderCoaches(list); await reload() } catch { setError(true) }
  }

  return (
    <>
      <CoachForm nextOrder={coaches.length} onAdded={reload} />
      <section className="adm-card">
        <h2>Coaches on the website {!loading && !error && <span className="adm-count">{coaches.length}</span>}</h2>
        <p className="adm-muted adm-hint">Use the arrows to change the order they appear in on the website.</p>
        {loading && <p className="adm-muted">Loading…</p>}
        {error && <small className="adm-err">Something went wrong loading or reordering the coaches. Refresh the page and try again.</small>}
        {!loading && !error && coaches.length === 0 && <p className="adm-muted">No coaches yet. Add one above. The "Our coaches" section stays hidden until you add someone.</p>}
        <div className="adm-coach-list">
          {coaches.map((c, i) => <CoachCard key={c.id} coach={c} index={i} total={coaches.length} onMove={move} onChanged={reload} />)}
        </div>
      </section>
    </>
  )
}
