import React from "react";

interface LogInButtonProps {
  onClick?: () => void;
}

const LogInButton: React.FC<LogInButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="px-6 py-2 border-4 border-black rounded-full text-lg text-black transition transform hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-110">
      Login
    </button>
  );
};

export default LogInButton;
