import { useState, useCallback, ChangeEvent } from 'react';

interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

export function useValidationForm() {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: e.target.validationMessage }));
    setIsValid(e.target.closest('form')?.checkValidity() ?? false);
  };

  const resetForm = useCallback(
    (newValues: FormValues = {}, newErrors: FormErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}
