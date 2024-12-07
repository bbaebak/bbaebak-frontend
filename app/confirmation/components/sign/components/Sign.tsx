'use client';

export default function Sign({ value, id, onClick, onSign }) {
  console.log('현재 사인유무', id, value, onSign);
  return (
    <div className="flex" onClick={() => onClick(id)}>
      <p>{value}</p>
      <p>인</p>
    </div>
  );
}
