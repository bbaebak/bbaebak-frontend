export default function List({ value, text }) {
  return (
    <div className="flex">
      <p className="text-black font-suit text-2xl font-bold leading-7">
        {value}
      </p>
      <p>{text}</p>
    </div>
  );
}
