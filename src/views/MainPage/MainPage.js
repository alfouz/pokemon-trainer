import React from "react";
import styles from "./MainPage.module.scss";
import Body from "./Body/Body";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Pokemon Trainer Beta</h3>
        <h6>Made by alfouz</h6>
      </div>
      <div className={styles.body}>
        <Body />
      </div>
    </div>
  );
};
export default MainPage;
