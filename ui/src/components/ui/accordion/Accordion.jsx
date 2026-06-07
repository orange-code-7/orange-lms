import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-sm border border-gray-200 bg-[var(--color-surface)]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-medium text-[var(--color-text)]">{title}</span>

        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && <div className="border-t border-gray-200 p-4">{children}</div>}
    </div>
  );
};

export default Accordion;
