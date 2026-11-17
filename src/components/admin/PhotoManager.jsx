import PhotoCard from './PhotoCard'

export default function PhotoManager({ photos, categories, loading, error, onChanged }) {
  return (
    <section className="adm-card">
      <h2>Photos on the website {!loading && !error && <span className="adm-count">{photos.length}</span>}</h2>
      {loading && <p className="adm-muted">Loading…</p>}
      {error && <small className="adm-err">Couldn't load the photos. Refresh the page to try again.</small>}
      {!loading && !error && photos.length === 0 && <p className="adm-muted">No photos yet. Upload some above.</p>}
      <div className="adm-grid">
        {photos.map((p) => <PhotoCard key={p.id} photo={p} categories={categories} onChanged={onChanged} />)}
      </div>
    </section>
  )
}
