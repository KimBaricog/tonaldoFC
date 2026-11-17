import { INFO_ITEMS } from '../../data/content'

export default function InfoBar() {
  return (
    <div className="info">
      {INFO_ITEMS.map(([icon, title, text]) => (
        <div key={title}>
          <span className="ic dk">{icon}</span>
          <span><h4>{title}</h4><p>{text}</p></span>
        </div>
      ))}
    </div>
  )
}
