'use client';
export default function SaveImageButton() {
  const canvas = document.querySelector('signDocument');

  const handleClick = () => {
    console.log('캔바스다', canvas);
  };

  return <button onClick={handleClick}>갤러리에 저장하기</button>;
}
