'use client';
import FluentLink from '@assets/svg/FluentLink';
import ExclamationTriangle from '@assets/svg/ExclamationTriangle';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ToastProps {
  message: string;
  isVisible: boolean;
  position?: 'top' | 'bottom';
  type?: 'success' | 'error';
}

function Toast({
  message,
  isVisible,
  position = 'bottom',
  type = 'success',
}: ToastProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setIsLeaving(false);
    } else {
      setIsLeaving(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  const positionClass = position === 'top' ? 'top-4' : 'bottom-4';
  const animationClass = isLeaving ? 'animate-fade-out' : 'animate-fade-in';

  const toast = (
    <div
      className={`
        fixed left-1/2 ${positionClass}
        w-[39.7rem] px-6 py-4
        flex justify-center items-center gap-3
        bg-white border border-gray-2 rounded-[0.8rem]
        shadow-[0px_0px_1.2rem_0.2rem_rgba(0,0,0,0.12)]
        text-bold17 z-50
        transform-gpu translate-x-[-50%]
        ${animationClass}
      `}
    >
      {type === 'success' ? <FluentLink /> : <ExclamationTriangle />}
      {message}
    </div>
  );

  return createPortal(toast, document.body);
}

export default Toast;
