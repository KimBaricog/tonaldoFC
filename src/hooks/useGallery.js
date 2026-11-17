import { useEffect, useState } from 'react'
import { fetchGalleryImages } from '../services/galleryService'

export default function useGallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    fetchGalleryImages()
      .then((data) => active && setImages(data))
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return { images, loading, error }
}
