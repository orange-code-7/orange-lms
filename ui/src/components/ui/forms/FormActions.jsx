import { Save } from "lucide-react";

const FormActions = ({ submitLabel }) => {
  return (
    <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
      <button
        type="submit"
        className="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition"
      >
        <Save size={16} />
        {submitLabel ?? "Save"}
      </button>
    </div>
  );
};

export default FormActions;
