import React from "react";

const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  className = "",
}) => {
  return (
    <div
      className={`
        rounded-sm border border-gray-200
        bg-[var(--color-surface)]
        p-4
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[var(--color-text-muted)]">{title}</p>

          <h3 className="mt-1 text-2xl font-bold text-[var(--color-text)]">
            {value}
          </h3>
        </div>

        {Icon && (
          <div className="rounded-sm bg-gray-100 p-2">
            <Icon size={18} className="text-[var(--color-text-muted)]" />
          </div>
        )}
      </div>

      {description && (
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
          {description}
        </p>
      )}
    </div>
  );
};

export default StatsCard;
