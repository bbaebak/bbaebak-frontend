'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  name?: string; // 이름 전달받기
  onClick: () => void;
}

const StampModal: React.FC<Props> = ({ isVisible, onClose, name, onClick }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null; // 모달이 보이지 않을 때 렌더링하지 않음

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6"
      >
        <div className="text-center">
          {/* bbeabak.svg 이미지 */}
          <Image
            src="/bbeabak.svg"
            alt="빼박 이미지"
            width={64}
            height={64}
            className="mx-auto mb-4"
          />
          <h2 className="text-xl font-bold mb-2">빼박할까요?</h2>
          <p className="text-gray-500 mb-6">
            {name ? `${name}님의 도장이에요` : ''}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            아니요 안 할래요
          </button>
          <button
            onClick={onClick}
            className="flex-1 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition"
          >
            네 도장 찍을래요!
          </button>
        </div>
      </div>
    </div>
  );
};

export default StampModal;
