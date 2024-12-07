'use client';

import html2canvas from 'html2canvas';

export default function SaveImageButton() {
  const handleSaveImage = async () => {
    // 빼박 증명서 문서 영역
    const signDocument = document.getElementById('signDocument');

    if (!signDocument) return;

    const canvas = await html2canvas(signDocument); // 캔버스로 변환
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'bbaebak-certificate.png';
    link.click();

    console.log('이미 저장히기', signDocument);
  };

  return <button onClick={handleSaveImage}>갤러리에 저장하기</button>;
}
