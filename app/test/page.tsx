'use client';

import React, { useState } from 'react';
import StampModal from 'app/common_components/StampModal';

const mockUpData = {
  names: ['퉁퉁', '스리', '티아', '물고기', '블랙', '재이'],
};

const Page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentName, setCurrentName] = useState('');

  const openModal = (name: string) => {
    setCurrentName(name); // 현재 선택된 이름 설정
    setIsModalVisible(true);
  };

  const closeModal = () => setIsModalVisible(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">
        모달 테스트 페이지
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {mockUpData.names.map(name => (
          <button
            key={name}
            onClick={() => openModal(name)}
            className="px-4 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
          >
            {name} 도장 찍기
          </button>
        ))}
      </div>
      <StampModal
        isVisible={isModalVisible}
        onClose={closeModal}
        name={currentName}
      />
    </div>
  );
};

export default Page;
