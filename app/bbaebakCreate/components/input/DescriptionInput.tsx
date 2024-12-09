import { ChangeEvent } from 'react';
import Input from './Input';

interface Props {
  value: string;
  onBlur: (value: string) => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error: string;
}

function DescriptionInput({ value, onBlur, onChange, error }: Props) {
  return (
    <Input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      placeholder="🍚 밥 먹기"
      isTextarea={true}
    />
  );
}

export default DescriptionInput;
