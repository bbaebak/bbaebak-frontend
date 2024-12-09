import { ButtonAttributes, Status } from 'app/types/button';
import { Ref, forwardRef } from 'react';

interface ButtonProps extends ButtonAttributes {
  status?: Status;
  width?: string;
  bgColor?: string;
}

const Button = forwardRef(function Button(
  {
    children,
    type = 'button',
    width,
    bgColor,
    status = 'Enabled',
    ...rest
  }: ButtonProps,
  forwardedRef: Ref<HTMLButtonElement>
) {
  return (
    <button
      type={type}
      ref={forwardedRef}
      className={`르
        flex justify-center items-center
        ${width ? width : 'w-full'}
        ${status === 'Disabled' ? 'bg-gray-1 text-gray-3 cursor-not-allowed' : 'bg-[#51B1E0] text-white cursor-pointer'}
        h-[53px] rounded-md text-lg font-bold
      `}
      disabled={status === 'Disabled'}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
