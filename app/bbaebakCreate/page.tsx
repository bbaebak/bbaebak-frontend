'use client';

import { useMutation } from '@tanstack/react-query';
import { postMakerSign, updateBbaebak } from 'app/api/apiList';
import CustomCalendar from 'app/bbaebakCreate/components/calendar/Calendar';
import DescriptionInput from 'app/bbaebakCreate/components/input/DescriptionInput';
import MateInput from 'app/bbaebakCreate/components/input/mate/MateInput';
import NameInput from 'app/bbaebakCreate/components/input/NameInput';
import ShareModal from 'app/common_components/ShareModal';
import {
  ERROR_DESCRIPTION_EMPTY,
  ERROR_MATE_LENGTH,
  ERROR_NAME_EMPTY,
  MATE_MAX_LENGTH,
} from 'app/constants/validation';
import { validateMateNameExist } from 'app/utils/validation';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sign from './components/stamp/Sign';

function BbaebakCreate() {
  const [isClient, setIsClient] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mateNames, setMateNames] = useState<string[]>([]);
  const [mateCountError, setMateCountError] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [id, setId] = useState<string | null>(null);
  const [showStamp, setShowStamp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    name: string;
    description: string;
    date: string;
    mates: string;
  }>({
    name: '',
    description: '',
    date: '',
    mates: '',
  });

  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');

  useEffect(() => {
    setIsClient(true);
    if (queryId) {
      setId(queryId);
    }
  }, [queryId]);

  const validateInputs = () => {
    const errors = {
      name: name.trim() ? '' : ERROR_NAME_EMPTY,
      description: description.trim() ? '' : ERROR_DESCRIPTION_EMPTY,
      date: selectedDate ? '' : '날짜를 선택해 주세요.',
      mates: mateNames.length > 0 ? '' : '함께하는 사람을 추가해 주세요.',
    };
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

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
    onSuccess: () => {
      setIsShareModalOpen(true);
    },
    onError: error => {
      console.error(error);
    },
  });

  const makerSignedBbaebakMutation = useMutation({
    mutationFn: () =>
      postMakerSign({
        isSigned: true,
        id: id as string,
      }),
    onSuccess: () => {
      setShowStamp(true);
      setIsButtonEnabled(true);
      setIsModalOpen(false);
    },
    onError: error => {
      console.error(error);
    },
  });

  const handleDateSelect = (date: any) => {
    if (Array.isArray(date)) {
      setSelectedDate(
        `${moment(date[0]).format('YYYY년 MM월 DD일부터')} ${moment(date[1]).format('YYYY년 MM월 DD일 중에')}`
      );
    } else {
      setSelectedDate(moment(date).format('YYYY년 MM월 DD일에'));
    }
  };

  const handleButtonClick = () => {
    if (validateInputs()) {
      setIsModalOpen(true);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-5">
      <div className="font-medium text-[1.3rem] flex items-center gap-4 mt-[30px]">
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
              error={formErrors.name}
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
            {isCalendarOpen && (
              <CustomCalendar
                isVisible={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                onDateSelect={handleDateSelect}
              />
            )}
            {selectedDate && (
              <span className="text-[#97D0EC]">{selectedDate}</span>
            )}
            {formErrors.date && <span>{formErrors.date}</span>}
          </div>

          <div className="flex gap-[5px]">
            <MateInput
              mateNames={mateNames}
              onMateChange={handleMateNameChange}
              error={mateCountError}
              onMateRemove={handleMateRemove}
            />
            과 함께
            {formErrors.mates && <span>{formErrors.mates}</span>}
          </div>

          <div className="flex gap-[5px]">
            <DescriptionInput
              value={description}
              onChange={e => setDescription(e.target.value)}
              error={formErrors.description}
              onBlur={() => {}}
            />
            를 약속합니다.
          </div>
        </div>

        <div className="p-[12px_16px] self-stretch border-t border-b border-[#97D0EC] mt-auto">
          <Sign
            maker={name}
            isSigned={showStamp}
            onClick={handleButtonClick}
            mates={mateNames}
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <p className="mb-4 text-center">증명서에 서명하시겠습니까?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => makerSignedBbaebakMutation.mutate()}>
                예
              </button>
              <button onClick={() => setIsModalOpen(false)}>아니요</button>
            </div>
          </div>
        </div>
      )}

      {isShareModalOpen && (
        <ShareModal
          isVisible={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

      <div className="mt-6 text-center">
        <button
          className={`w-full h-14 ${
            isButtonEnabled ? 'bg-[#97D0EC]' : 'bg-[#c0c0c0] cursor-not-allowed'
          }`}
          disabled={!isButtonEnabled}
          onClick={() => updateBbaebakMutation.mutate()}
        >
          상대방에게 증명서 보내기
        </button>
      </div>
    </div>
  );
}

export default BbaebakCreate;
