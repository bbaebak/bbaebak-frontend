import moment from 'moment';

export default function Date({ value }: { value: string }) {
  // if (!value) {
  //   return;
  // }
  // const dateObj = new Date(value);

  // ${moment().year()}

  // const formattedDate = dateObj.toLocaleDateString('ko-KR', {
  //   timeZone: 'Asia/Seoul',
  //   year: 'numeric',
  //   month: 'numeric',
  //   day: 'numeric',
  // });

  // console.log('vava', value);
  return (
    <div className="text-[#51B1E0] font-suit text-[18px] font-medium leading-normal">
      {value}
      {/* {  ${moment(value).year()}} */}
    </div>
  );
}
