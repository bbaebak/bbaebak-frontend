'use client';

import { useMutation } from '@tanstack/react-query';
import { updateBbaebak } from 'app/api/apiList';
import SendCertificateBtn from 'app/bbaebakCreate/components/button/SendCertificateBtn';
import DescriptionInput from 'app/bbaebakCreate/components/input/DescriptionInput';
import MateInput from 'app/bbaebakCreate/components/input/mate/MateInput';
import NameInput from 'app/bbaebakCreate/components/input/NameInput';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DateInput from './components/input/DateInput';
import { useBbaebakForm } from './hooks/useBbaebakForm';

function BbaebakCreate() {
  const {
    nameValidation,
    descriptionValidation,
    mateNames,
    mateCountError,
    selectedDate,
    setSelectedDate,
    handleMateNameChange,
    handleMateRemove,
    validateAllFields,
  } = useBbaebakForm();

  const [isClient, setIsClient] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');

  useEffect(() => {
    dayjs.locale('ko');
    setIsClient(true);
    if (queryId) {
      setId(queryId);
    }
  }, [queryId]);

  const updateBbaebakMutation = useMutation({
    mutationFn: () =>
      updateBbaebak(
        {
          maker: nameValidation.value,
          date: selectedDate!,
          desc: descriptionValidation.value,
          mates: mateNames.map(name => ({ name })),
        },
        id as string
      ),
    onSuccess: () => {
      // 성공 시 처리
    },
    onError: error => {
      console.error('실패:', error);
    },
  });

  const handleSubmit = () => {
    if (validateAllFields()) {
      updateBbaebakMutation.mutate();
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
        <span className="text-[#97D0EC] text-center mb-4">
          {dayjs().format('YYYY년 MM월 DD일')}
        </span>

        <div className="flex flex-col gap-[25px]">
          <div className="flex gap-[5px]">
            <NameInput
              value={nameValidation.value}
              onChange={e => nameValidation.setValue(e.target.value)}
              error={nameValidation.error}
              onBlur={nameValidation.handleBlur}
            />
            은/는
          </div>

          <div className="flex gap-[5px]">
            <DateInput value={selectedDate} onChange={setSelectedDate} />에
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
              value={descriptionValidation.value}
              onChange={e => descriptionValidation.setValue(e.target.value)}
              error={descriptionValidation.error}
              onBlur={descriptionValidation.handleBlur}
            />
            를 약속합니다.
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <SendCertificateBtn
          isEnabled={Boolean(
            nameValidation.value &&
              descriptionValidation.value &&
              mateNames.length > 0 &&
              selectedDate &&
              !nameValidation.error &&
              !descriptionValidation.error &&
              !mateCountError
          )}
          onValidate={validateAllFields}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default BbaebakCreate;
