import { User } from "lucide-react";

const TextInput = ({ label, value, onChange, placeholder, icon: IconProp }) => {
  const Icon = IconProp || User;
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon size={16} className="absolute left-3 top-3 text-gray-400" />
        )}
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 outline-none"
        />
      </div>
    </div>
  );
};

export default TextInput;
