import ConfirmPopup from "@/components/ui/popup/ConfirmPopup";
import ErrorPopup from "@/components/ui/popup/ErrorPopup";
import SuccessPopup from "@/components/ui/popup/SuccessPopup";

import usePopupStore from "@/app/store/popupStore";

const PopupProvider = () => {
  const {
    confirm,
    error,
    success,

    closeConfirm,
    closeError,
    closeSuccess,
  } = usePopupStore();

  return (
    <>
      <ConfirmPopup
        open={confirm.open}
        title={confirm.title}
        message={confirm.message}
        onClose={closeConfirm}
        onConfirm={async () => {
          try {
            await confirm.action?.();
          } catch (error) {
            console.error(error);
          } finally {
            closeConfirm();
          }
        }}
      />

      <ErrorPopup
        open={error.open}
        title={error.title}
        message={error.message}
        onClose={closeError}
      />

      <SuccessPopup
        open={success.open}
        title={success.title}
        message={success.message}
        onClose={closeSuccess}
      />
    </>
  );
};

export default PopupProvider;
