'use client';
import { useValidation } from '@hooks/useValidation';
import DescriptionInput from 'app/bbaebakCreate/components/input/DescriptionInput';
import MateInput from 'app/bbaebakCreate/components/input/mate/MateInput';
import NameInput from 'app/bbaebakCreate/components/input/NameInput';
import { ERROR_MATE_LENGTH, MATE_MAX_LENGTH } from 'app/constants/validation';
import {
  validateDescription,
  validateMateNameExist,
  validateName,
} from 'app/utils/validation';
import { useState } from 'react';

function BbaebakCreate() {
  const {
    value: name,
    setValue: setName,
    error: nameError,
    handleBlur: handleNameBlur,
  } = useValidation('');
  const {
    value: description,
    setValue: setDescription,
    error: descriptionError,
    handleBlur: handleDescriptionBlur,
  } = useValidation('');

  const [mateNames, setMateNames] = useState<string[]>([]);
  const [mateCountError, setMateCountError] = useState('');

  const handleMateNameChange = (mateName: string) => {
    if (mateNames.length >= MATE_MAX_LENGTH) {
      setMateCountError(ERROR_MATE_LENGTH);
      return;
    }

    const mateError = validateMateNameExist(mateName, mateNames);
    setMateCountError(mateError || '');
    if (!mateError) {
      setMateNames(prevNames => [...prevNames, mateName]);
    }
  };

  const handleMateRemove = (mateName: string) => {
    setMateNames(prevNames => prevNames.filter(name => name !== mateName));
    setMateCountError('');
  };

  const isFormValid = !nameError && !descriptionError && !mateCountError;

  return (
    <div>
      <NameInput
        value={name}
        onChange={e => setName(e.target.value)}
        error={nameError}
        onBlur={() => handleNameBlur(validateName)}
      />
      <DescriptionInput
        value={description}
        onChange={e => setDescription(e.target.value)}
        error={descriptionError}
        onBlur={() => handleDescriptionBlur(validateDescription)}
      />
      <MateInput
        mateNames={mateNames}
        onMateChange={handleMateNameChange}
        error={mateCountError}
        onMateRemove={handleMateRemove}
      />
      <button disabled={!isFormValid}>제출</button>
    </div>
  );
}

export default BbaebakCreate;
