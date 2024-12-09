import { ChangeEvent, useState } from 'react';

interface Props {
  onMateChange: (mateName: string) => void;
}

export const useMateInput = ({ onMateChange }: Props) => {
  const [mateName, setMateName] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMateName(e.target.value);
  };

  const handleAddMate = () => {
    if (mateName.trim() === '') return;
    onMateChange(mateName);
    setMateName('');
  };

  return {
    mateName,
    handleChange,
    handleAddMate,
  };
};
