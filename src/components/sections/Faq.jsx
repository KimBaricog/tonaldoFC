import { useState } from 'react'
import { useContent, edit } from '../../context/ContentContext'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)
  const c = useContent('faq')
  return (
    <div>
      <div className="kick" {...edit('faq.kick')}>{c.kick}</div>
      <h2 className="h2" {...edit('faq.title')}>{c.title}</h2>
      {c.items.map((it, i) => (
        <div className="q" key={i}>
          <h3 onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
            <span {...edit(`faq.items.${i}.question`)}>{it.question}</span><span>{openIndex === i ? '–' : '+'}</span>
          </h3>
          {(openIndex === i) && <p {...edit(`faq.items.${i}.answer`)}>{it.answer}</p>}
        </div>
      ))}
    </div>
  )
}
