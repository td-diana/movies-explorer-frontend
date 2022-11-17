import "./InfoTooltip.css";
import successPicture from "../../images/failure.svg";
import failurePicture from "../../images/success.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`tooltip__container ${isOpen && 'tooltip__container_opened'}`} onClose={onClose}>
      <div className="tooltip">
        <img
          className="tooltip__img"
          src={isSuccess ? failurePicture : successPicture}
          alt="cтатус регистрации"
        />
        <div className="tooltip__caption">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </div>
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