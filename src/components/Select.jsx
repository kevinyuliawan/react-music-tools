export default function Select ({ onChange, label, options, defaultValue }) {
  const optionsJsx = options.map(o => 
    <option key={o.id} value={o.value}>{o.name}</option>
  );

  const name = label.replace(/\W/g, '').toLowerCase();
  const nameSelect = `${name}-select`;

  return (
    <div className="select-parent">
      <label htmlFor={nameSelect}>{label} {' '}</label>

      <select 
        name={name} 
        id={nameSelect}
        onChange={e => onChange(e.target.value)}
        value={defaultValue}
      >
        {optionsJsx}
      </select>
    </div>
  )
}