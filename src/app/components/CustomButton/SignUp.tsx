import React from "react";
import styles from "./CustomButton.module.css";

interface SignUpButton {
  onClick?: () => void;
}

const SignUpButton = ({ onClick }: SignUpButton) => {
  return (
    <button onClick={onClick} className="px-6 py-2 border-4 border-black rounded-full text-lg text-black transition transform hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-110">
      Sign Up
    </button>
  );
};

export default SignUpButton;
