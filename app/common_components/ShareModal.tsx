import KakaoShareButton from '@components/KakaoShareButton';
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import copyLinkIcon from '@public/copyLink.svg';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Toast from './Toast/Toast';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onValidate: () => string | null;
  id: string;
  userName: any;
}

function ShareModal({ isVisible, onClose, onValidate, id, userName }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [_, copy] = useCopyToClipboard();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleCopy = () => {
    const validationError = onValidate();

    if (validationError) {
      setToastMessage(validationError);
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2700);
      return;
    }

    const currentUrl = `https://bbaebak-nextjs.vercel.app/confirmation?id=${id}`;
    copy(currentUrl)
      .then(() => {
        setToastMessage('링크를 복사했어요!');
        setToastType('success');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2700);
      })
      .catch((error: unknown) => {
        setToastMessage('링크 복사에 실패했어요 😢');
        setToastType('error');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2700);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      <m.div
        ref={modalRef}
        className="absolute bottom-0 left-0 right-0 max-w-full bg-white shadow-xl rounded-tl-[30px] rounded-tr-[30px] rounded-b-[40px] border-b-4 border-[#DCEFF9]"
        style={{
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        }}
        initial={{ y: '100%' }}
        animate={{ y: isVisible ? '0' : '100%' }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="w-full max-w-[430px] mx-auto h-[180px] flex flex-col items-center justify-center">
          <span className="text-lg font-medium">공유하기</span>

          <div className="flex flex-row items-center justify-between w-[200px] mt-[30px]">
            <div className="flex flex-col items-center justify-center gap-4">
              <KakaoShareButton userName={userName} />
              <p>카카오톡</p>
            </div>

            <div
              className="flex flex-col items-center justify-center gap-4 cursor-pointer"
              onClick={handleCopy}
            >
              <div className="w-[40px] h-[40px] flex items-center justify-center bg-white border border-[#e0e0e0] rounded-full">
                <Image src={copyLinkIcon} alt="링크 복사" className="w-6 h-6" />
              </div>

              <p>링크복사</p>
            </div>
          </div>
        </div>
      </m.div>
      <Toast
        message={toastMessage}
        isVisible={showToast}
        position="bottom"
        type={toastType}
      />
    </>
  );
}

export default ShareModal;
