import { Clock } from "lucide-react";

const TimeInput = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <Clock size={16} className="absolute left-3 top-3 text-gray-400" />
        <input
          type="time"
          value={value || ""} // HH:MM format
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>
    </div>
  );
};

export default TimeInput;
