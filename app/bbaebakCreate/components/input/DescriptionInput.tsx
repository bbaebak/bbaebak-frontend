import { ChangeEvent } from 'react';

interface Props {
  value: string;
  onBlur: (value: string) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

function DescriptionInput({ value, onBlur, onChange, error }: Props) {
  return (
    <div>
      <input
        type="text"
        defaultValue={value}
        onChange={onChange}
        onBlur={e => onBlur(e.target.value)}
        placeholder="🍚 밥 먹기"
      />
      {error && <p>{error}</p>}
    </div>
  );
}

export default DescriptionInput;
