import React from "react";

const PageHeader = ({ title, description, actions }) => {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold text-[var(--color-text)]">{title}</h1>

      {description && (
        <p className="max-w-3xl text-sm leading-6 text-[var(--color-text-muted)]">
          {description}
        </p>
      )}

      {actions && <div className="pt-2">{actions}</div>}
    </div>
  );
};

export default PageHeader;
