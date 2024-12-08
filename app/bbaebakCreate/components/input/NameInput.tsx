import { ChangeEvent } from 'react';
import Input from './Input';

interface Props {
  value: string;
  onBlur: (value: string) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

function NameInput({ value, onBlur, onChange, error }: Props) {
  return (
    <Input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      placeholder="당신의 이름"
      containerClassName="w-[120px]"
    />
  );
}

export default NameInput;
