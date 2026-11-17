export default function SectionHead({ kick, title, text }) {
  return (
    <div className="head">
      <div className="kick">{kick}</div>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
