import React from "react";
import styles from "./Modal.module.scss";

const Modal = ({ children, title, visible, onClose }) => {
  return visible ? (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <div className={styles.closeButton} onClick={onClose}>
          X
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  ) : (
    <div />
  );
};
export default Modal;
