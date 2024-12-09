import { ChangeEvent } from 'react';

interface Props {
  value: string;
  onBlur: (value: string) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

function NameInput({ value, onBlur, onChange, error }: Props) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={e => onBlur(e.target.value)}
        placeholder="이름"
      />
      {error && <p>{error}</p>}
    </div>
  );
}

export default NameInput;
