import { useState } from 'react'
import { FAQS } from '../../data/content'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <div>
      <div className="kick">FAQ</div>
      <h2 className="h2">Common questions</h2>
      {FAQS.map(([question, answer], i) => (
        <div className="q" key={question}>
          <h3 onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
            {question}<span>{openIndex === i ? '–' : '+'}</span>
          </h3>
          {openIndex === i && <p>{answer}</p>}
        </div>
      ))}
    </div>
  )
}
