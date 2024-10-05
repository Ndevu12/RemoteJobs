import React from "react";

interface btn {
  className: string;
  text: string;
  loading?: boolean;
  onClick?: () => void;
}

const Button2: React.FC<btn> = ({text, loading, onClick }) => {
  return (
    <button
      className='p-3 rounded text-blue-700'
      type="submit"
      onClick={onClick}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button2;