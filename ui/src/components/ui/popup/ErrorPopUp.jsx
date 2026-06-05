import Popup from "./PopUp";

const ErrorPopup = ({
  open,
  onClose,
  title = "Error",
  message = "Something went wrong.",
}) => {
  return (
    <Popup open={open} onClose={onClose} title={title} width="max-w-md">
      <div className="space-y-4">
        <p className="text-sm text-red-600">{message}</p>

        <button
          onClick={onClose}
          className="w-full rounded-sm bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </Popup>
  );
};

export default ErrorPopup;
