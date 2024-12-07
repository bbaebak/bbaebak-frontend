'use client';
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import Button from 'app/common_components/Button';
import Toast from 'app/common_components/Toast/Toast';
import { useState } from 'react';

//TODO: 디자인 적용, toast 적용
function SendCertificateBtn() {
  const [_, copy] = useCopyToClipboard();
  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    const currentUrl = window.location.href;
    copy(currentUrl)
      .then(() => {
        console.log('Copied!', currentUrl);
        setShowToast(false);
        setTimeout(() => {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2700);
        }, 100);
      })
      .catch((error: unknown) => {
        console.error('Failed to copy!', error);
      });
  };

  return (
    <>
      <Button onClick={handleCopy}>상대방에게 증명서 보내기</Button>
      <Toast
        message="링크를 복사했어요!"
        isVisible={showToast}
        position="bottom"
      />
    </>
  );
}

export default SendCertificateBtn;
