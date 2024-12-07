'use client';
import React, { useState } from 'react';

interface Props {
  mateNames: string[];
  onMateChange: (mateName: string) => void;
  onMateRemove: (mateName: string) => void;
  error: string;
}

function MateInput({ mateNames, onMateChange, onMateRemove, error }: Props) {
  const [mateName, setMateName] = useState('');
  const [selectedMate, setSelectedMate] = useState<string | null>(null);

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

  const handleMateClick = (mate: string) => {
    setSelectedMate(prev => (prev === mate ? null : mate));
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {mateNames.map((mate, index) => (
          <div key={index} onClick={() => handleMateClick(mate)}>
            <p>{mate}</p>
            {selectedMate === mate && (
              <button
                onClick={e => {
                  e.stopPropagation();
                  onMateRemove(mate);
                }}
              >
                x
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MateInput;
