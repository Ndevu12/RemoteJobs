// src/components/Buttons/Button.tsx
import React from "react";

interface ButtonProps {
  className?: string;
  text: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({text, loading, disabled, onClick }) => {
  return (
    <button
      className='bg-blue-400 p-3 rounded'
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button;