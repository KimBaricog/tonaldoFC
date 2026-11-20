import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchGalleryImages } from '../../services/galleryService'
import UploadForm from './UploadForm'
import PhotoManager from './PhotoManager'

export default function GalleryManager() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const reload = useCallback(async () => {
    try { setPhotos(await fetchGalleryImages()); setError(false) } catch { setError(true) } finally { setLoading(false) }
  }, [])
  useEffect(() => { reload() }, [reload])

  const categories = useMemo(() => [...new Set(photos.map((p) => p.category))], [photos])

  return (
    <>
      <UploadForm categories={categories} onUploaded={reload} />
      <PhotoManager photos={photos} categories={categories} loading={loading} error={error} onChanged={reload} />
    </>
  )
}
