import React from "react";
import styles from "./InfoBox.module.scss";

const InfoBox = ({ message, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <p className={styles.text}>{message}</p>
    </div>
  );
};
export default InfoBox;
