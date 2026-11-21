import { edit } from '../../context/ContentContext'

// `path` (e.g. "features") lets the admin preview jump to the right field when a heading is clicked
export default function SectionHead({ kick, title, text, path }) {
  return (
    <div className="head">
      {kick && <div className="kick" {...(path && edit(`${path}.kick`))}>{kick}</div>}
      <h2 {...(path && edit(`${path}.title`))}>{title}</h2>
      {text && <p {...(path && edit(`${path}.text`))}>{text}</p>}
    </div>
  )
}
