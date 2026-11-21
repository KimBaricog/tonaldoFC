import { useState } from 'react'
import { useContent, edit } from '../../context/ContentContext'

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT
const EMPTY = { name: '', email: '', phone: '', age: '', msg: '', hp: '' }

export default function EnquiryForm() {
  const c = useContent('contact')
  const { email: EMAIL, phone: PHONE } = useContent('site')
  const [f, setF] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | mail | error
  const [copied, setCopied] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (f.hp) return // spam trap: real visitors never see or fill this field
    if (!FORM_ENDPOINT) {
      // No form service configured: fall back to the visitor's email app
      const body = `Name: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone}\nAge group: ${f.age}\n\n${f.msg}`
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Session enquiry')}&body=${encodeURIComponent(body)}`
      setStatus('mail')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: f.name, email: f.email, phone: f.phone, age_group: f.age, message: f.msg, _subject: 'New session enquiry' }),
      })
      if (!res.ok) throw new Error('Request failed')
      setF(EMPTY)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* ignore */ }
  }

  return (
    <div className="form">
      {status === 'sent' ? (
        <div className="thanks">
          <div className="ic lg">✓</div>
          <h2>Enquiry sent</h2>
          <p>Thank you! We'll reply with available times as soon as we can.</p>
          <button className="btn dk" onClick={() => setStatus('idle')}>Send another enquiry</button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <h2 {...edit('contact.title')}>{c.title}</h2><p className="sub" {...edit('contact.text')}>{c.text}</p>
          <input required placeholder="Parent or player name" value={f.name} onChange={set('name')} />
          <input required type="email" placeholder="Email" value={f.email} onChange={set('email')} />
          <input type="tel" placeholder="Phone" value={f.phone} onChange={set('phone')} />
          <select value={f.age} onChange={set('age')}><option value="">Player age group</option>{c.ageGroups.map((a) => <option key={a}>{a}</option>)}</select>
          <textarea rows="4" placeholder="Tell us about your goals" value={f.msg} onChange={set('msg')} />
          <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" placeholder="Leave this empty" value={f.hp} onChange={set('hp')} />
          <button className="btn wide" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : c.button}</button>
          {status === 'mail' && <small className="ok">Opening your email app. If nothing opens, copy our email below and send us your details.</small>}
          {status === 'error' && <small className="err">Sorry, that didn't send. Please email {EMAIL} or call {PHONE}.</small>}
        </form>
      )}
      <div className="alt">
        <span>Prefer to email or call?</span>
        <div><a href={`mailto:${EMAIL}`}>{EMAIL}</a><button type="button" onClick={copyEmail}>{copied ? 'Copied ✓' : 'Copy'}</button></div>
        <div><a href={`tel:${PHONE.replace(/[^+\d]/g, '')}`}>{PHONE}</a></div>
      </div>
    </div>
  )
}
