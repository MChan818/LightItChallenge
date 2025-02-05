import { useState } from "react";
import { ErrorInputType } from "../types/error-input-type";
import { InputFields } from "../constants/InputFields";

const useError = () => {
  const [error, setError] = useState<ErrorInputType[]>([]);

  const handleError = (id: InputFields) => {
    return error
      .slice()
      .reverse()
      .find((x) => x.field === id);
  };

  const addError = (error: ErrorInputType) => {
    setError((err) => [...err, error]);
  };

  const clearError = (id: InputFields) => {
    setError((error) => error.filter((err) => err.field !== id));
  };

  const emptyError = () => {
    setError([]);
  };

  return { error, handleError, addError, clearError, emptyError };
};

export default useError;
