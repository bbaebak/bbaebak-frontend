import { ChangeEvent, KeyboardEvent, ReactNode } from 'react';

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
  readonly?: boolean;
}

function Input({
  value,
  onChange,
  onBlur,
  onKeyDown,
  error,
  placeholder,
  prefix,
  suffix,
  className = '',
  containerClassName = '',
  onClick,
  readonly = false,
}: Props) {
  return (
    <div className={`relative flex flex-col gap-0.25rem ${containerClassName}`}>
      <div
        className={`inline-flex items-center gap-0.625rem p-[0.25rem_0.5rem] rounded-[0.375rem] border border-[#E0E0E0] bg-white ${readonly ? 'cursor-pointer' : ''}`}
        onClick={onClick}
      >
        {prefix && <div className="flex-shrink-0">{prefix}</div>}
        <input
          type="text"
          value={value}
          onChange={onChange}
          onBlur={e => onBlur?.(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          readOnly={readonly}
          className={`w-full bg-transparent border-none outline-none text-base ${className} ${readonly ? 'cursor-pointer' : ''}`}
        />
        {suffix && <div className="flex-shrink-0">{suffix}</div>}
      </div>
      {error && (
        <p className="text-red-500 text-sm absolute -bottom-1.5rem">{error}</p>
      )}
    </div>
  );
}

export default Input;
