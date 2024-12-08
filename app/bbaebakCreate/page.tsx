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
import SendCertificateBtn from './components/button/SendCertificateBtn';

//TODO: 날짜 선택 컴포넌트 추가
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
  const {
    value: mateName,
    setValue: setMateName,
    error: mateNameError,
  } = useValidation('');
  const {
    value: date,
    setValue: setDate,
    error: dateError,
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

  const isAllFieldsFilled = Boolean(
    name &&
      description &&
      mateNames.length > 0 &&
      date &&
      !nameError &&
      !descriptionError &&
      !mateCountError &&
      !dateError
  );

  const validateAllFields = () => {
    // 이름 검증
    const nameError = validateName(name);
    if (nameError) return nameError;

    // 설명 검증
    const descError = validateDescription(description);
    if (descError) return descError;

    // 메이트 검증
    if (mateNames.length === 0) {
      return '빼박 메이트를 한 명 이상 추가해주세요.';
    }
    if (mateNames.length > MATE_MAX_LENGTH) {
      return ERROR_MATE_LENGTH;
    }

    // 날짜 검증
    if (!date) {
      return '날짜를 선택해주세요.';
    }

    return null;
  };

  return (
    <div>
      <NameInput
        value={name}
        onChange={e => setName(e.target.value)}
        error={nameError}
        onBlur={handleNameBlur}
      />
      <DescriptionInput
        value={description}
        onChange={e => setDescription(e.target.value)}
        error={descriptionError}
        onBlur={handleDescriptionBlur}
      />
      <MateInput
        mateNames={mateNames}
        onMateChange={handleMateNameChange}
        error={mateCountError}
        onMateRemove={handleMateRemove}
      />
      <SendCertificateBtn
        isEnabled={isAllFieldsFilled}
        onValidate={validateAllFields}
      />
    </div>
  );
}

export default BbaebakCreate;
