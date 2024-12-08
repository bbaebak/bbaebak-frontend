import Link from 'next/link';

export default function NewButton() {
  return (
    <Link href="/">
      <button className="flex h-[53px] p-4 justify-center items-center self-stretch mt-6 w-full rounded-lg bg-[#51B1E0] text-white font-suit text-[17px] font-bold">
        나도 빼박 증명서 만들기
      </button>
    </Link>
  );
}
