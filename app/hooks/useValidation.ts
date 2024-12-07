import { useState } from 'react';

export const useValidation = (initialState: string) => {
  const [value, setValue] = useState(initialState);
  const [error, setError] = useState('');

  const validate = (validationFunc: (value: string) => string) => {
    const errorMessage = validationFunc(value);
    setError(errorMessage);
  };

  const handleBlur = (validationFunc: (value: string) => string) => {
    validate(validationFunc);
  };

  return { value, setValue, error, handleBlur };
};
