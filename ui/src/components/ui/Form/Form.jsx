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
      className="bg-white rounded-2xl shadow-lg border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b">
        <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
          <ClipboardEdit size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
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
      <FormActions submitLabel={submitLabel} />
    </form>
  );
};

export default Form;
