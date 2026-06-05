import Popup from "./PopUp";

const ConfirmPopup = ({
  open,
  onClose,
  onConfirm,
  title = "Confirmation",
  message = "Are you sure?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}) => {
  return (
    <Popup open={open} onClose={onClose} title={title} width="max-w-md">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-sm border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            {cancelLabel}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-sm bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default ConfirmPopup;
