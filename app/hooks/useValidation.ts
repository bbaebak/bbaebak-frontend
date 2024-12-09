import { validateDescription, validateName } from 'app/utils/validation';
import { useEffect, useState } from 'react';

interface ValidationHookReturn {
  value: string;
  setValue: (value: string) => void;
  error: string;
}

export const useValidation = (
  initialValue: string,
  type: 'name' | 'description'
): ValidationHookReturn => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  useEffect(() => {
    const validationError =
      type === 'name' ? validateName(value) : validateDescription(value);
    setError(validationError);
  }, [value, type]);

  return { value, setValue, error };
};
