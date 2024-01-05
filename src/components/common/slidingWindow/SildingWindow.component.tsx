import React from "react";
import style from "./SlidingWindow.module.css";
interface SlidingWindowProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const SlidingWindow: React.FC<SlidingWindowProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <div className={`${style["sliding-window"]} ${isOpen ? style.open : ""}`}>
      <div
        className={style["window-content"]}
        style={{ maxHeight: "100vh", overflowY: "auto" }}
      >
        <button className={style["close-button"]} onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};
