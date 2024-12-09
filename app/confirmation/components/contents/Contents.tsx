import mockData from '../../mockData.json';
import List from './components/List';

export interface ContentsType {
  maker: string;
  date: string;
  desc: string;
  status: string;
  mates: {
    id: string;
    name: string;
    isSigned: boolean;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export default function Contents({
  maker,
  date,
  desc,
  status,
  mates,
  createdAt,
  updatedAt,
}: ContentsType) {
  const mateValue = mates.map(item => item.name).join(', ');

  return (
    <section className="flex flex-col items-start gap-[16px] pt-[16px] pb-[12px] self-stretch">
      <List value={maker} text={'은/는'} />
      <List value={date} text={'에'} />
      <List value={mateValue} text={'와/과 함께'} />
      <List value={desc} text={'을/를 약속합니다.'} />
    </section>
  );
}
