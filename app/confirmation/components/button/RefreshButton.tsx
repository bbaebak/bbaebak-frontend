import Image from 'next/image';

export default function RefreshButton() {
  const handleClick = () => {
    window.location.reload(); // 페이지 새로고침
  };
  return (
    <button
      onClick={handleClick}
      className="w-[24px] h-[24px] shrink-0 absolute inset-y-0 right-[24px] my-auto"
    >
      <Image src="/refresh.svg" alt="새로고침" width={24} height={24} />
    </button>
  );
}
