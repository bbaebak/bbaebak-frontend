'use client';
import React, { useState } from 'react';

interface Props {
  mateNames: string[];
  onMateChange: (mateName: string) => void;
  error: string;
}

function MateInput({ mateNames, onMateChange, error }: Props) {
  const [mateName, setMateName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setMateName(name);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleAddMate();
    }
  };

  const handleAddMate = () => {
    if (mateName.trim() === '') return;
    onMateChange(mateName);
    setMateName('');
  };

  return (
    <div>
      <input
        type="text"
        value={mateName}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="👯‍♂️ 빼박 메이트 이름"
      />
      <button onClick={handleAddMate}>추가</button>
      {error && <p>{error}</p>}
      {mateNames.map((mate, index) => (
        <p key={index}>{mate}</p>
      ))}
    </div>
  );
}

export default MateInput;
