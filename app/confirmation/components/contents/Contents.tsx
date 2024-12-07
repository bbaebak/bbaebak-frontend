import mockData from '../../mockData.json';
import List from './components/List';

export interface ContentsType {
  maker: string;
  mate: string[];
  contents: string;
  appointmentDate: string;
}

export default async function Contents({
  maker,
  mate,
  contents,
  appointmentDate,
}: ContentsType) {
  // 약속: bbaebak
  // 약속하는 사람: maker
  // 약속할 상대: mate
  // 도장(=서명): stamp

  console.log('약속할 사람들', mate);

  const mateValue = mate.join(', ');

  return (
    <section className="flex flex-col bg-white">
      <List value={maker} text={'은/는'} />
      <List value={mateValue} text={'과 함께'} />
      <List value={appointmentDate} text={'쯤'} />
      <List value={contents} text={'를 약속합니다.'} />
    </section>
  );
}
