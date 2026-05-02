import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

function Button({ children, onClick, disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
  padding: "8px 16px",
  borderRadius: "6px",
  border: "none",
  background: disabled ? "#d9d9d9" : "#1677ff",
  color: disabled ? "#999" : "#fff",
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.7 : 1,
  transition: "0.2s",
}}
    >
      {children}
    </button>
  );
}


export default Button;