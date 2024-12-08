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
    link.click(); // 사용자가 클릭하지 않아도 다운로드 동작 실행됨

    console.log('이미 저장히기', signDocument);
  };

  return (
    <button
      onClick={handleSaveImage}
      className="flex p-4 justify-center items-center flex-1 rounded-lg bg-[#F8F8F8] text-[#5E5E5E] font-suit text-[17px] font-bold flex p-4 justify-center items-center flex-[1_0_0] hover:bg-blue-500 hover:text-white transition rounded-lg border border-blue-secondary bg-blue-light p-4"
    >
      갤러리에 저장하기
    </button>
  );
}
