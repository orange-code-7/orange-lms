import { ClipboardEdit } from "lucide-react";

import FormActions from "./FormActions";
import FormField from "./FormField";

const Form = ({
  title,
  description,
  schema,
  values,
  onChange,
  onSubmit,
  submitLabel,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-app">
        <div
          className="p-2 rounded-lg"
          style={{
            background: "var(--color-primary-soft)",
            color: "var(--color-primary)",
          }}
        >
          <ClipboardEdit size={20} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-app">{title}</h2>

          {description && (
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Fields */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {schema.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={(name, val) => onChange(name, val)}
          />
        ))}
      </div>

      {/* Actions */}
      {submitLabel === "" ? <></> : <FormActions submitLabel={submitLabel} />}
    </form>
  );
};

export default Form;
