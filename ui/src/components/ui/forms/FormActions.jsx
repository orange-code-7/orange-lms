import { Save } from "lucide-react";

const FormActions = ({ submitLabel }) => {
  return (
    <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
      <button
        type="submit"
        className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2 text-white transition hover:bg-orange-600"
      >
        <Save size={16} />
        {submitLabel ?? "Save"}
      </button>
    </div>
  );
};

export default FormActions;
