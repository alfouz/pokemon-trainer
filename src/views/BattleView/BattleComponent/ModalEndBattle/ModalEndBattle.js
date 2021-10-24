import React from "react";
import styles from "./ModalEndBattle.module.scss";

const ModalEndBattle = ({ children, isWin, visible, onAccept }) => {
  return visible ? (
    <div className={styles.outterContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>
            {isWin
              ? "CONGRATULATIONS! You win"
              : "Keep trying, maybe next time"}
          </h3>
          <div className={styles.closeButton} onClick={onAccept}>
            Accept
          </div>
        </div>
        <div className={styles.body}>
          {isWin ? (
            <h4>You win x gold and x items</h4>
          ) : (
            <h4>You loose x gold</h4>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
};
export default ModalEndBattle;
