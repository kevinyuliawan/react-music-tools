export default function Checkbox ({ label, defaultValue, onChange }) {
  return (
    <div className="checkbox">
        <label>
          <input type="checkbox" checked={defaultValue} onChange={onChange} />
          {label}
        </label>
      </div>
    );
}