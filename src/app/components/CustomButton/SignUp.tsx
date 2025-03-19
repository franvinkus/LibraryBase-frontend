import React from "react";
import styles from "./CustomButton.module.css";

interface SignUpButton {
  onClick?: () => void;
}

const SignUpButton = ({ onClick }: SignUpButton) => {
  return (
    <button onClick={onClick} className={styles["LogIn-Button"]}>
      Sign Up
    </button>
  );
};

export default SignUpButton;
