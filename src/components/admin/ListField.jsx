import { useEffect, useState } from 'react'
import FieldRenderer from './FieldRenderer'
import Icon from './Icon'

// Editable list: add, remove, reorder. Items are either groups of fields or single pieces of text.
export default function ListField({ field, value = [], onChange, path, focus }) {
  const items = Array.isArray(value) ? value : []
  const grouped = Boolean(field.fields)
  const [open, setOpen] = useState(() => new Set(items.length <= 4 ? items.map((_, i) => i) : []))

  // open the item that was clicked in the preview
  useEffect(() => {
    const m = focus?.path?.startsWith(`${path}.`) && focus.path.slice(path.length + 1).split('.')[0]
    if (m !== undefined && m !== false && Number.isInteger(+m)) setOpen((s) => new Set(s).add(+m))
  }, [focus, path])

  const update = (next) => onChange(next)
  const setItem = (i, v) => update(items.map((it, j) => (j === i ? v : it)))
  const remove = (i) => update(items.filter((_, j) => j !== i))
  const move = (i, step) => {
    const j = i + step
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    update(next)
    setOpen(new Set())
  }
  const add = () => { update([...items, field.blank()]); setOpen((s) => new Set(s).add(items.length)) }
  const toggle = (i) => setOpen((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n })

  return (
    <div className="cx-list" data-field={path}>
      <div className="cx-list-label">{field.label} <em>{items.length}</em></div>
      {items.map((item, i) => (
        <div className={`cx-item${grouped ? '' : ' plain'}`} key={i}>
          {grouped ? (
            <>
              <div className="cx-item-head">
                <button type="button" className="cx-item-title" onClick={() => toggle(i)} aria-expanded={open.has(i)}>
                  <Icon name="chevron" size={16} /><span>{item?.[field.titleKey] || `${field.itemName} ${i + 1}`}</span>
                </button>
                <Controls i={i} total={items.length} onMove={move} onRemove={remove} />
              </div>
              {open.has(i) && (
                <div className="cx-item-body">
                  {field.fields.map((f) => (
                    <FieldRenderer key={f.key} field={f} value={item?.[f.key]} path={`${path}.${i}.${f.key}`} focus={focus} onChange={(v) => setItem(i, { ...item, [f.key]: v })} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="cx-plain-row">
              <input data-field={`${path}.${i}`} value={item ?? ''} onChange={(e) => setItem(i, e.target.value)} aria-label={`${field.itemName} ${i + 1}`} />
              <Controls i={i} total={items.length} onMove={move} onRemove={remove} />
            </div>
          )}
        </div>
      ))}
      <button type="button" className="cx-add" onClick={add}><Icon name="plus" size={16} /> Add {field.itemName}</button>
    </div>
  )
}

function Controls({ i, total, onMove, onRemove }) {
  return (
    <span className="cx-ctrl">
      <button type="button" aria-label="Move up" onClick={() => onMove(i, -1)} disabled={i === 0}><Icon name="up" size={15} /></button>
      <button type="button" aria-label="Move down" onClick={() => onMove(i, 1)} disabled={i === total - 1}><Icon name="down" size={15} /></button>
      <button type="button" aria-label="Remove" className="danger" onClick={() => onRemove(i)}><Icon name="trash" size={15} /></button>
    </span>
  )
}
