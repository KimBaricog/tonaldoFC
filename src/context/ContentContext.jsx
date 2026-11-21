import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_CONTENT } from '../data/defaultContent'
import { mergeContent } from '../lib/contentUtils'
import { fetchStoredContent } from '../services/contentService'

const CACHE_KEY = 'tonaldo-content-v1'
const Ctx = createContext({ content: DEFAULT_CONTENT, editor: false })

const readCache = () => { try { return JSON.parse(localStorage.getItem(CACHE_KEY)) || {} } catch { return {} } }
const writeCache = (stored) => { try { localStorage.setItem(CACHE_KEY, JSON.stringify(stored)) } catch { /* storage unavailable: ignore */ } }

// Provides the website text to every component.
//  - Starts from the built-in text (plus the last copy this browser saw, so edited text doesn't flash).
//  - Then loads the edited text from the database. If that fails for any reason, nothing changes: the site keeps its text.
//  - Inside the admin "Site content" preview (?editor=1 in an iframe) it shows the admin's live draft instead,
//    and clicking text tells the admin which field to open.
export function ContentProvider({ children }) {
  const editor = useMemo(() => new URLSearchParams(window.location.search).get('editor') === '1' && window.parent !== window, [])
  const [content, setContent] = useState(() => mergeContent(DEFAULT_CONTENT, editor ? {} : readCache()))

  useEffect(() => {
    if (editor) return
    let active = true
    fetchStoredContent()
      .then((stored) => { if (active) { writeCache(stored); setContent(mergeContent(DEFAULT_CONTENT, stored)) } })
      .catch(() => { /* keep the built-in / cached text */ })
    return () => { active = false }
  }, [editor])

  useEffect(() => {
    if (!editor) return
    const origin = window.location.origin
    const onMessage = (e) => {
      if (e.origin !== origin || e.data?.type !== 'tonaldo-draft') return
      setContent(mergeContent(DEFAULT_CONTENT, e.data.content))
    }
    const onClick = (e) => {
      const el = e.target.closest?.('[data-edit]')
      if (el) window.parent.postMessage({ type: 'tonaldo-focus', path: el.dataset.edit }, origin)
      // links that leave the page (maps, email, phone) do nothing while editing; buttons and menus still work
      const link = e.target.closest?.('a[href]')
      if (link && !link.getAttribute('href').startsWith('#')) e.preventDefault()
    }
    document.documentElement.classList.add('is-editor')
    window.addEventListener('message', onMessage)
    document.addEventListener('click', onClick, true)
    document.addEventListener('submit', (e) => e.preventDefault(), true)
    window.parent.postMessage({ type: 'tonaldo-ready' }, origin)
    return () => {
      document.documentElement.classList.remove('is-editor')
      window.removeEventListener('message', onMessage)
      document.removeEventListener('click', onClick, true)
    }
  }, [editor])

  return <Ctx.Provider value={{ content, editor }}>{children}</Ctx.Provider>
}

export const useContent = (section) => useContext(Ctx).content[section]

// Marks an element as editable in the admin preview: <h1 {...edit('hero.line1')}>
export const edit = (path) => ({ 'data-edit': path })
