import { useState, useCallback } from "react";

export function useFormWithValidation(inputs) {
  const [values, setValues] = useState(inputs);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
      const { target } = event;
      const { name } = target;
      const { value } = target;
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: target.validationMessage });
      setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}
