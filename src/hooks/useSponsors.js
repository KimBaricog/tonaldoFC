import { useEffect, useState } from 'react'
import { fetchSponsors } from '../services/sponsorService'

export default function useSponsors() {
  const [sponsors, setSponsors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    fetchSponsors()
      .then((data) => active && setSponsors(data))
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return { sponsors, loading, error }
}
