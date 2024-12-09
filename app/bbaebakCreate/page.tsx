'use client';

import { useMutation } from '@tanstack/react-query';
import { postMakerSign, updateBbaebak } from 'app/api/apiList';
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
import {
  ERROR_DESCRIPTION_EMPTY,
  ERROR_NAME_EMPTY,
} from 'app/constants/validation';
import moment from 'moment';
import ShareModal from 'app/common_components/ShareModal';
import Sign from './components/stamp/Sign';
import StampModal from 'app/common_components/StampModal';

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
  const [showStamp, setShowStamp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isStampModalShown, setIsStampModalShown] = useState(false);

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
      setIsShareModalOpen(true);
    },
    onError: error => {
      console.error('실패:', error);
    },
  });

  const handleSubmit = () => {
    setIsShareModalOpen(true);
    if (validateAllFields()) {
      updateBbaebakMutation.mutate();
      setIsShareModalOpen(true);
    }
  };

  const makerSignedBbaebakMutation = useMutation({
    mutationFn: () =>
      postMakerSign({
        isSigned: true,
        id: id as string,
      }),
    onSuccess: () => {
      if (!isStampModalShown) {
        setShowStamp(true);
        setIsModalOpen(false);
        setIsStampModalShown(true);
      }
    },
    onError: error => {
      console.error(error);
    },
  });

  const handleButtonClick = () => {
    if (!isStampModalShown) {
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

      <div className="bg-[#f6f5f2] flex flex-col gap-2 p-5 pt-5 mt-[20px] h-auto rounded-[2px]">
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

        <div className="p-[10px_16px] self-stretch border-t border-b border-[#97D0EC] mt-auto mt-12">
          <Sign
            maker={nameValidation.value}
            isSigned={showStamp}
            onClick={handleButtonClick}
            mates={mateNames}
          />
        </div>
      </div>

      {isShareModalOpen && (
        <ShareModal
          isVisible={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          onValidate={validateAllFields}
        />
      )}

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
          onClick={() => handleSubmit()}
        />
      </div>

      <StampModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onClick={() => makerSignedBbaebakMutation.mutate()}
      />
    </div>
  );
}

export default BbaebakCreate;
