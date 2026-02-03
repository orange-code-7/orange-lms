const RadioButton = ({ label, name, value, selected, onChange }) => (
  <label className="inline-flex items-center gap-2 text-sm text-gray-700">
    <input
      type="radio"
      name={name}
      value={value}
      checked={selected === value}
      onChange={(e) => onChange(e.target.value)}
      className="w-4 h-4 rounded-full border-gray-300 focus:ring-2 focus:ring-orange-500"
    />
    {label}
  </label>
);

export default RadioButton;
