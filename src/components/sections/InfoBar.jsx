import { useContent, edit } from '../../context/ContentContext'

export default function InfoBar() {
  const { items } = useContent('info')
  return (
    <div className="info">
      {items.map((it, i) => (
        <div key={i}>
          <span className="ic dk">{it.icon}</span>
          <span><h4 {...edit(`info.items.${i}.title`)}>{it.title}</h4><p {...edit(`info.items.${i}.text`)}>{it.text}</p></span>
        </div>
      ))}
    </div>
  )
}
