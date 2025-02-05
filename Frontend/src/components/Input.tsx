import React, { useState } from "react";
import { ErrorInputType } from "../types/error-input-type";

interface InputProps {
  label: string;
  type?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: ErrorInputType;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value = "",
  onChange,
  placeholder,
  disabled = false,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="relative mb-4 w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full mt-1 block px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          isFocused ? "focus:ring-blue-500" : "focus:ring-gray-300"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"} ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error?.error && (
        <span className="absolute text-xs text-red-500 mt-1">
          {error.msg}
        </span>
      )}
    </div>
  );
};

export default Input;
