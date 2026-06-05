import Popup from "./PopUp";

const SuccessPopup = ({
  open,
  onClose,
  title = "Success",
  message = "Operation completed successfully.",
}) => {
  return (
    <Popup open={open} onClose={onClose} title={title} width="max-w-md">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">{message}</p>

        <button
          onClick={onClose}
          className="w-full rounded-sm bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          OK
        </button>
      </div>
    </Popup>
  );
};

export default SuccessPopup;
