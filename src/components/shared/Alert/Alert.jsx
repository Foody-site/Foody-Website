import { useState, useEffect } from "react";
import rocket from "/assets/alert/rocket.png";
import Button from "../Buttons/Button";

const Alert = ({
  message,
  subMessage,
  isOpen,
  onClose,
  autoClose = false,
  autoCloseTime = 5000,
  type = "success", 
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);

    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseTime, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;


  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-8 max-w-lg w-full animate-fade-in">
        <img
          src={rocket}
          alt="Rocket"
          className="w-44 h-44 mb-6 animate-bounce-slow"
        />

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {message || "تم تسجيل حسابك"}{" "}
          {type === "success" ? (
            <span className="text-green-600">بنجاح</span>
          ) : (
            <span className="text-primary-1">فشل</span>
          )}
        </h2>

        <p className="text-gray-600 mb-8">{subMessage}</p>

        <Button
          label="التالي"
          onClick={handleClose}
          className="bg-primary-1 hover:bg-hover_primary-1 text-white font-semibold py-3 px-8 rounded-lg w-full max-w-xs"
        />
      </div>
    </div>
  );
};

export default Alert;
