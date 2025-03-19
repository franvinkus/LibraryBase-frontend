import React from "react";
import styles from "./CustomButton.module.css";

interface LogInButton {
  onClick?: () => void;
}

const LogInButton = ({ onClick }: LogInButton) => {
  return (
    <button onClick={onClick} className={styles["LogIn-Button"]}>
      Login
    </button>
  );
};

export default LogInButton;
