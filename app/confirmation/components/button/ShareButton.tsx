export default function ShareButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex p-4 justify-center items-center flex-1 rounded-lg bg-[#F8F8F8] text-[#5E5E5E] font-suit text-[17px] font-bold flex p-4 justify-center items-center flex-[1_0_0] hover:bg-blue-500 hover:text-white transition rounded-lg border border-blue-secondary bg-blue-light p-4"
    >
      증명서 공유하기
    </button>
  );
}
