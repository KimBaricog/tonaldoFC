import ListField from './ListField'

// Renders one schema field. `path` is like "faq.items.2.question" (also used to jump here from the preview).
export default function FieldRenderer({ field, value, onChange, path, focus }) {
  if (field.type === 'list') return <ListField field={field} value={value} onChange={onChange} path={path} focus={focus} />
  const Tag = field.type === 'textarea' ? 'textarea' : 'input'
  return (
    <label className="cx-field">
      <span>{field.label}</span>
      <Tag data-field={path} value={value ?? ''} onChange={(e) => onChange(e.target.value)} {...(Tag === 'textarea' ? { rows: 3 } : { type: 'text' })} />
      {field.hint && <small>{field.hint}</small>}
    </label>
  )
}
