import { useCallback, useEffect, useState } from 'react'
import { fetchSponsors } from '../../services/sponsorService'
import { reorderSponsors } from '../../services/sponsorAdminService'
import SponsorForm from './SponsorForm'
import SponsorCard from './SponsorCard'

export default function SponsorManager() {
  const [sponsors, setSponsors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const reload = useCallback(async () => {
    try { setSponsors(await fetchSponsors()); setError(false) } catch { setError(true) } finally { setLoading(false) }
  }, [])
  useEffect(() => { reload() }, [reload])

  const move = async (index, step) => {
    const list = [...sponsors]
    const target = index + step
    if (target < 0 || target >= list.length) return
    ;[list[index], list[target]] = [list[target], list[index]]
    try { await reorderSponsors(list); await reload() } catch { setError(true) }
  }

  return (
    <>
      <SponsorForm nextOrder={sponsors.length} onAdded={reload} />
      <section className="adm-card">
        <h2>Sponsors on the website {!loading && !error && <span className="adm-count">{sponsors.length}</span>}</h2>
        <p className="adm-muted adm-hint">Use the arrows to change the order. The "Sponsors" section stays hidden until you add someone.</p>
        {loading && <p className="adm-muted">Loading…</p>}
        {error && <small className="adm-err">Something went wrong loading or reordering the sponsors. Refresh the page and try again.</small>}
        {!loading && !error && sponsors.length === 0 && <p className="adm-muted">No sponsors yet. Add one above.</p>}
        <div className="adm-coach-list">
          {sponsors.map((s, i) => <SponsorCard key={s.id} sponsor={s} index={i} total={sponsors.length} onMove={move} onChanged={reload} />)}
        </div>
      </section>
    </>
  )
}
