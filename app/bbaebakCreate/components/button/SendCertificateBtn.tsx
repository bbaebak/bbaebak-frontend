'use client';
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';

//TODO: 디자인 적용, toast 적용
function SendCertificateBtn() {
  const [_, copy] = useCopyToClipboard();

  const handleCopy = () => {
    const currentUrl = window.location.href;
    copy(currentUrl)
      .then(() => {
        console.log('Copied!', currentUrl);
      })
      .catch((error: unknown) => {
        console.error('Failed to copy!', error);
      });
  };

  return <button onClick={handleCopy}>상대방에게 증명서 보내기</button>;
}

export default SendCertificateBtn;
