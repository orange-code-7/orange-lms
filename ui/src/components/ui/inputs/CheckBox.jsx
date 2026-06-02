const Checkbox = ({ label, checked, onChange }) => (
  <label className="inline-flex items-center gap-2 text-sm text-gray-700">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-orange-500"
    />
    {label}
  </label>
);

export default Checkbox;
