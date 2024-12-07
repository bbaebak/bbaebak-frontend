import Contents from './components/contents/Contents';
import Date from './components/Date';
import NewButton from './components/NewButton';
import RefreshButton from './components/RefreshButton';
import SaveButton from './components/SaveButton';
import ShareButton from './components/ShareButton';
import Signature from './components/sign/Signature';
import Title from './components/Title';
import mockData from './mockData.json';

const URL = '서버 주소';
const userId = '1'; // 사용자 아이디

async function getData() {
  const res = await fetch(URL);
  const json = await res.json();
  return json;
}

export default async function Confirmation() {
  // const data= await getData();
  const data = await mockData;
  const currentData = data.filter(item => String(item.id) === String(userId));

  const { maker, mate, contents, createdDate, appointmentDate, stamp } =
    currentData[0];

  console.log('약속한 사람들', mate);
  return (
    <div className="flex flex-col w-[430px] h-[988px] bg-sky-500/100">
      <section className="flex items-center">
        <h1>빼박 증명서</h1>
      </section>
      <section className="flex flex-col bg-white">
        <Date value={createdDate} />
        <Contents {...currentData[0]} />
        <Signature maker={maker} mate={mate} stamp={stamp} />
      </section>
      <section>
        <div>
          <SaveButton />
          <ShareButton />
        </div>
        <NewButton />
      </section>
      <RefreshButton />
    </div>
  );
}

// [공통 언어]

// 약속: bbaebak
// 약속하는 사람: maker
// 약속할 상대: mate
// 도장(=서명): stamp
