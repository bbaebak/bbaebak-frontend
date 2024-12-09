import { ChangeEvent, KeyboardEvent, ReactNode } from 'react';

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
  isTextarea?: boolean;
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
  isTextarea = false,
}: Props) {
  return (
    <div className="flex flex-col">
      <div className={`relative flex flex-col gap-1 ${containerClassName}`}>
        <div
          className={`inline-flex items-center gap-2 p-1 rounded-lg border border-[#E0E0E0] bg-white ${readonly ? 'cursor-pointer' : ''}`}
          onClick={onClick}
        >
          {prefix && <div className="flex-shrink-0">{prefix}</div>}
          {isTextarea ? (
            <textarea
              value={value}
              onChange={onChange}
              onBlur={e => onBlur?.(e.target.value)}
              placeholder={placeholder}
              readOnly={readonly}
              className={`w-[200px] h-[70px] bg-transparent border-none outline-none text-base ${className} ${readonly ? 'cursor-pointer' : ''} resize-none overscroll-hidden`}
              rows={1}
            />
          ) : (
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
          )}
          {suffix && <div className="flex-shrink-0">{suffix}</div>}
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default Input;
