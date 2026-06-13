import { FileText } from "lucide-react";

const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">{label}</label>

      <div className="relative">
        <FileText size={16} className="absolute left-3 top-3 text-gray-400" />

        <textarea
          value={value || ""}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[110px] w-full rounded-sm border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-200 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
        />
      </div>
    </div>
  );
};

export default TextArea;
