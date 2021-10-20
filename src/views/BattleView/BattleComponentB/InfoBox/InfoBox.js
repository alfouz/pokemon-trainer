import React from "react";
import styles from "./InfoBox.module.scss";

const InfoBox = ({ message, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <pre className={styles.text}>{message}</pre>
    </div>
  );
};
export default InfoBox;
