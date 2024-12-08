'use client';

import Input from '../Input';
import MateTag from './MateTag';
import { useMateInput } from '../../../hooks/useMateInput';

interface Props {
  mateNames: string[];
  onMateChange: (mateName: string) => void;
  onMateRemove: (mateName: string) => void;
  error: string;
}

function MateInput({ mateNames, onMateChange, onMateRemove, error }: Props) {
  const { mateName, handleChange, handleAddMate } = useMateInput({
    onMateChange,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          value={mateName}
          onChange={handleChange}
          error={error}
          placeholder="상대방의 이름"
          containerClassName="w-[200px]"
          suffix={
            <button
              onClick={handleAddMate}
              className="text-gray-400 hover:text-gray-600"
            >
              +
            </button>
          }
        />
      </div>

      {mateNames.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {mateNames.map((mate, index) => (
            <MateTag
              key={index}
              name={mate}
              onRemove={() => onMateRemove(mate)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MateInput;
