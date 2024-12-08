import { useState } from 'react';

interface ValidationHookReturn {
  value: string;
  setValue: (value: string) => void;
  error: string;
  handleBlur: () => void;
}

export const useValidation = (initialValue: string): ValidationHookReturn => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  const handleBlur = () => {
    // 여기서 validation 로직 처리
  };

  return { value, setValue, error, handleBlur };
};
