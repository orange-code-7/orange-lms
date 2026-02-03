import { FileText } from "lucide-react";

const TextArea = ({ label, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <FileText size={16} className="absolute left-3 top-3 text-gray-400" />
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-3 py-2 border rounded-lg min-h-[100px] focus:ring-2 focus:ring-orange-500 outline-none"
      />
    </div>
  </div>
);

export default TextArea;
