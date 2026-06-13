import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ items = [], backTo, backLabel = "Back" }) => {
  if (!items.length && !backTo) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {backTo && (
        <Link
          to={backTo}
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </Link>
      )}

      {items.length > 0 && (
        <div className="text-xs text-[var(--color-text-muted)]">
          {items.map((item, index) => (
            <span key={item.to || item.label}>
              {item.label}

              {index < items.length - 1 && " / "}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Breadcrumbs;
