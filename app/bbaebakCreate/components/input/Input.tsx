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
    <div className="relative">
      <div className={containerClassName}>
        <div
          className={`flex w-full items-center justify-center gap-2 p-1 rounded-lg border border-[#E0E0E0] bg-white ${
            readonly ? 'cursor-pointer' : ''
          }`}
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
              className={`pr-2 pl-2 w-[200px] h-[70px] bg-transparent border-none outline-none text-base ${className} ${
                readonly ? 'cursor-pointer' : ''
              } resize-none overscroll-hidden`}
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
              className={`pr-2 pl-2 w-full bg-transparent border-none outline-none text-base [&:not(:placeholder-shown)]:text-center ${className} ${
                readonly ? 'cursor-pointer' : ''
              }`}
            />
          )}
          {suffix && <div className="flex-shrink-0">{suffix}</div>}
        </div>
      </div>
      {error && (
        <div className="absolute left-0 w-max">
          <p className="text-red-500 text-sm mt-2">{error}</p>
        </div>
      )}
    </div>
  );
}

export default Input;
