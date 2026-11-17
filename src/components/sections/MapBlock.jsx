import { ADDRESS } from '../../data/content'

export default function MapBlock() {
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`
  return (
    <div className="map">
      <div className="pin" />
      <div className="lab">{ADDRESS}</div>
      <a className="btn dir" target="_blank" rel="noreferrer" href={directions}>Get directions</a>
    </div>
  )
}
