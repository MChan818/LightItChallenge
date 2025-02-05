import { tv } from "tailwind-variants";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "rounded";
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  rounded?: boolean;
  fullWidth?: boolean;
}

const buttonStyles = tv({
  base: "inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer",
  variants: {
    variant: {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-300",
      outline:
        "border border-gray-500 text-gray-700 hover:bg-gray-500 focus:ring-gray-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
    },
    size: {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
      rounded: "p-4",
    },
    rounded: {
      true: "rounded-full",
      false: "rounded-lg",
    },
    fullWidth: {
      true: "w-full",
      false: "auto",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    rounded: false,
  },
});

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  icon,
  iconPosition = "left",
  rounded,
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles({ variant, size, rounded, fullWidth })}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
}
