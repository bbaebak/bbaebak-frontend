export default function List({ value, text }: { value: string; text: string }) {
  return (
    <div className="whitespace-pre-wrap w-full gap-[4px] self-stretch">
      <p className="text-[#000] font-suit text-[22px] font-bold leading-[29px] inline mr-[8px]">
        {value}
      </p>
      <p className="text-[#454545] font-suit text-[22px] font-normal leading-[29px] inline">
        {text}
      </p>
    </div>
  );
}
