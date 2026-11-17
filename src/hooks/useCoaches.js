import { useEffect, useState } from 'react'
import { fetchCoaches } from '../services/coachService'

export default function useCoaches() {
  const [coaches, setCoaches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    fetchCoaches()
      .then((data) => active && setCoaches(data))
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return { coaches, loading, error }
}
