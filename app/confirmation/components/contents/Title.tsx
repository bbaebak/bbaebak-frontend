interface Props {
  status: string;
}

export default function Title({ status }: Props) {
  return (
    <div className="flex w-[430px] justify-center items-center gap-[10px]">
      <p className="text-[#000] font-suit text-[28px] font-semibold leading-normal">
        {status === 'completed' ? '빼박 증명서' : '약속에 초대 받았어요!'}
      </p>
    </div>
  );
}
