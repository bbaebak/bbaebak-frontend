'use client';
import { useValidation } from '@hooks/useValidation';
import { useMutation } from '@tanstack/react-query';
import { postMakerSign, updateBbaebak } from 'app/api/apiList';
import CustomCalendar from 'app/bbaebakCreate/components/calendar/Calendar';
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

//TODO: design, get home id
function BbaebakCreate() {
  const [id, setId] = useState<string>('');
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
  const [IscalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: any) => {
    if (Array.isArray(date)) {
      setSelectedDate(date[0]);
    } else {
      setSelectedDate(date);
    }
  };

  const formattedMates = mateNames.map(name => ({ name }));

  const updateBbaebakMutation = useMutation({
    mutationFn: () =>
      updateBbaebak(
        {
          maker: name,
          date: selectedDate!,
          desc: description,
          mates: formattedMates,
        },
        id
      ),
    onSuccess: async data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  const makerSignedMutation = useMutation({
    mutationFn: () => postMakerSign(true, id),
    onSuccess: async data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });

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
      {IscalendarOpen && (
        <CustomCalendar
          isVisible={IscalendarOpen}
          onClose={() => setIsCalendarOpen(false)}
          onDateSelect={handleDateSelect}
        />
      )}

      <button
        className="toggle-button"
        onClick={() => setIsCalendarOpen(prevState => !prevState)}
      >
        날짜 선택
      </button>

      <button onClick={() => updateBbaebakMutation.mutate()}>
        약속 생성하기
      </button>
      <button onClick={() => makerSignedMutation.mutate()}>
        약속 한 사람의 서명
      </button>
    </div>
  );
}

export default BbaebakCreate;
