import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

const PasswordInput = ({
  label,
  name,
  value,
  onChange,

  placeholder = "Enter password",

  required = false,
  disabled = false,
  readOnly = false,

  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-[var(--color-text)]">
          {label}

          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <Lock
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
        />

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value || ""}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          onChange={(e) => onChange?.(e.target.value)}
          className={`
            w-full rounded-sm border
            py-2 pl-10 pr-10
            outline-none transition

            ${
              error
                ? "border-red-300 focus:border-red-500"
                : "border-gray-200 focus:border-orange-400"
            }

            ${disabled ? "cursor-not-allowed bg-gray-100" : "bg-white"}
          `}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordInput;
