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
  // 약속: bbaebak
  // 약속하는 사람: maker
  // 약속할 상대: mate
  // 도장(=서명): stamp

  console.log('약속할 사람들', mates);

  const mateValue = mates.map(item => item.name).join(', ');

  return (
    <section className="flex flex-col items-start gap-[16px] pt-[16px] pb-[12px] self-stretch">
      <List value={maker} text={'은/는'} />
      <List value={date} text={'에'} />
      <List value={mateValue} text={'과 함께'} />
      <List value={desc} text={'를 약속합니다.'} />
    </section>
  );
}
