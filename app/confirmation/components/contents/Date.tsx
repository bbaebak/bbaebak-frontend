import moment from 'moment';

export default function Date({ value }: { value: string }) {
  const formattedDate = moment(value).format('YYYY년 MM월 D일');
  return (
    <div className="text-[#51B1E0] font-suit text-[18px] font-medium leading-normal">
      {formattedDate}
      {/* {  ${moment(value).year()}} */}
    </div>
  );
}
