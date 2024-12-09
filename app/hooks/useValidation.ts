import { validateDescription, validateName } from 'app/utils/validation';
import { useState } from 'react';

interface ValidationHookReturn {
  value: string;
  setValue: (value: string) => void;
  error: string;
  handleBlur: () => void;
}

export const useValidation = (
  initialValue: string,
  type: 'name' | 'description'
): ValidationHookReturn => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  const validate = (currentValue: string) => {
    if (!isDirty) return;

    const validationError =
      type === 'name'
        ? validateName(currentValue)
        : validateDescription(currentValue);
    setError(validationError);
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    setIsDirty(true);
    validate(newValue);
  };

  const handleBlur = () => {
    setIsDirty(true);
    validate(value);
  };

  return { value, setValue: handleValueChange, error, handleBlur };
};
