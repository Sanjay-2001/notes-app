import { useEffect } from "react";
import "./Toast.css";
import { FaRegCheckSquare } from "react-icons/fa";
import { FaRegRectangleXmark } from "react-icons/fa6";

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);
  return (
    <div
      className={`toast-body  ${type === "delete" ? "red" : "green"} ${
        isShown ? "visible" : "notVisible"
      } `}
    >
      {type === "delete" ? (
        <FaRegRectangleXmark className="toast-icon" />
      ) : (
        <FaRegCheckSquare className="toast-icon" />
      )}
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;
