'use client';

import { useMutation } from '@tanstack/react-query';
import { updateBbaebak } from 'app/api/apiList';
import CustomCalendar from 'app/bbaebakCreate/components/calendar/Calendar';
import DescriptionInput from 'app/bbaebakCreate/components/input/DescriptionInput';
import MateInput from 'app/bbaebakCreate/components/input/mate/MateInput';
import NameInput from 'app/bbaebakCreate/components/input/NameInput';
import { ERROR_MATE_LENGTH, MATE_MAX_LENGTH } from 'app/constants/validation';
import { validateMateNameExist } from 'app/utils/validation';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function BbaebakCreate() {
  const [isClient, setIsClient] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mateNames, setMateNames] = useState<string[]>([]);
  const [mateCountError, setMateCountError] = useState('');
  const [IscalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [id, setId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');

  useEffect(() => {
    setIsClient(true);
    if (queryId) {
      setId(queryId);
    }
  }, [queryId]);

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

  const updateBbaebakMutation = useMutation({
    mutationFn: () =>
      updateBbaebak(
        {
          maker: name,
          date: selectedDate!,
          desc: description,
          mates: mateNames.map(name => ({ name })),
        },
        id as string
      ),
    onSuccess: async data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  const handleDateSelect = (value: any) => {
    if (Array.isArray(value)) {
      const [startDate] = value;
      setSelectedDate(new Date(startDate));
    } else {
      setSelectedDate(new Date(value));
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-5">
      <div className="font-medium  text-[1.3rem] flex items-center gap-4 mt-[30px]">
        <Link href="/">
          <Image src="/backBtn.svg" alt="뒤로가기" width={8} height={8} />
        </Link>
        가벼운 빼박 증명서 만들기
      </div>

      <div className="bg-[#f6f5f2] flex flex-col gap-2 p-10 pt-5 mt-[20px] min-h-[424px] h-auto rounded-[2px]">
        <span className="text-[#97D0EC] text-center mb-4">2024년 12월 7일</span>

        <div className="flex flex-col gap-[25px]">
          <div className="flex gap-[5px]">
            <NameInput
              value={name}
              onChange={e => setName(e.target.value)}
              error={''}
              onBlur={() => {}}
            />
            은/는
          </div>

          <div className="flex gap-[5px]">
            <button
              className="toggle-button"
              onClick={() => setIsCalendarOpen(prevState => !prevState)}
            >
              언제
            </button>

            {IscalendarOpen && (
              <CustomCalendar
                isVisible={IscalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                onDateSelect={handleDateSelect}
              />
            )}
          </div>
          <div className="flex gap-[5px]">
            <MateInput
              mateNames={mateNames}
              onMateChange={handleMateNameChange}
              error={mateCountError}
              onMateRemove={handleMateRemove}
            />
            과 함께
          </div>

          <div className="flex gap-[5px]">
            <DescriptionInput
              value={description}
              onChange={e => setDescription(e.target.value)}
              error={''}
              onBlur={() => {}}
            />
            를 약속합니다.
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          className="bg-[#c0c0c0] w-full h-14"
          onClick={() => updateBbaebakMutation.mutate()}
        >
          상대방에게 증명서 보내기
        </button>
      </div>
    </div>
  );
}

export default BbaebakCreate;
