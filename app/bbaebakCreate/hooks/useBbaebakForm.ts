import {
  ERROR_DATE_EMPTY,
  ERROR_MATE_LENGTH,
  MATE_MAX_LENGTH,
} from 'app/constants/validation';
import { useValidation } from 'app/hooks/useValidation';
import {
  validateDescription,
  validateMateNameExist,
  validateName,
} from 'app/utils/validation';
import { useState } from 'react';

export const useBbaebakForm = () => {
  const nameValidation = useValidation('', 'name');
  const descriptionValidation = useValidation('', 'description');
  const mateNameValidation = useValidation('', 'name');

  const [mateNames, setMateNames] = useState<string[]>([]);
  const [mateCountError, setMateCountError] = useState('');
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [isStampSigned, setIsStampSigned] = useState(false);

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

  const validateAllFields = (): string | null => {
    // 이름 검증
    const nameError = validateName(nameValidation.value);
    if (nameError) return nameError;

    // 설명 검증
    const descError = validateDescription(descriptionValidation.value);
    if (descError) return descError;

    // 메이트 검증
    if (mateNames.length === 0) {
      return '빼박 메이트를 한 명 이상 추가해주세요.';
    }
    if (mateNames.length > MATE_MAX_LENGTH) {
      return ERROR_MATE_LENGTH;
    }

    // 날짜 검증
    if (!selectedDate) {
      return ERROR_DATE_EMPTY;
    }

    return null;
  };

  return {
    nameValidation,
    descriptionValidation,
    mateNameValidation,
    mateNames,
    mateCountError,
    selectedDate,
    setSelectedDate,
    handleMateNameChange,
    handleMateRemove,
    validateAllFields,
    isStampSigned,
    setIsStampSigned,
  };
};
