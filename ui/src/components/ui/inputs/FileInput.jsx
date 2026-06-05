import { Upload, File } from "lucide-react";

const FileInput = ({ label, value, onChange, accept, disabled = false }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-600">{label}</label>

      <label
        className={`cursor-pointer ${
          disabled ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 transition hover:border-orange-300 hover:bg-orange-50/30">
          <Upload size={18} className="text-orange-500" />

          <span className="text-sm text-gray-600">
            {value?.name || "Choose file"}
          </span>
        </div>

        <input
          type="file"
          accept={accept}
          disabled={disabled}
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      </label>

      {value?.name && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <File size={14} />
          {value.name}
        </div>
      )}
    </div>
  );
};

export default FileInput;
