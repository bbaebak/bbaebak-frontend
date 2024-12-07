export default function List({ value, text }) {
  return (
    <div className="flex flex-wrap items-center gap-[4px] self-stretch">
      <p className="text-[#000] font-suit text-[22px] font-bold leading-[29px]">
        {value}
      </p>
      <p className="text-[#454545] font-suit text-[22px] font-normal leading-[29px] flex-grow">
        {text}
      </p>
    </div>
  );
}
