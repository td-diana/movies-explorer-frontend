import "./InfoTooltip.css";
import { useEffect } from "react";
// import successPicture from "../../images/failure.svg";
// import failurePicture from "../../images/success.svg";

function InfoTooltip({ isOpen: { isOpen, text, isSuccess }, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscClose);

    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  function handleOverlay(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`tooltip__container ${isOpen && "tooltip__container_opened"}`}
      onClick={onClose}
    >
      <div className="tooltip" onClick={handleOverlay}>
        <div
          className={`tooltip__img ${
            isSuccess ? "tooltip__img_success" : "tooltip__img_failure"
          }`}
        ></div>
        <h3 className="tooltip__caption">{text}</h3>
        <button
          type="button"
          className="tooltip__close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
