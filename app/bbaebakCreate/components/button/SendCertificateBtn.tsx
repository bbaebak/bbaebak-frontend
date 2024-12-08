'use client';
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import Button from 'app/common_components/Button';
import Toast from 'app/common_components/Toast/Toast';
import { useState } from 'react';

interface Props {
  isEnabled: boolean;
  onValidate: () => string | null;
}

function SendCertificateBtn({ isEnabled, onValidate }: Props) {
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

    const currentUrl = window.location.href;
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

  return (
    <>
      <Button onClick={handleCopy} status={isEnabled ? 'Enabled' : 'Disabled'}>
        상대방에게 증명서 보내기
      </Button>
      <Toast
        message={toastMessage}
        isVisible={showToast}
        position="bottom"
        type={toastType}
      />
    </>
  );
}

export default SendCertificateBtn;
