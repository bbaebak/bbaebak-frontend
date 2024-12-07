import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarProps {
  isVisible: boolean;
  onClose: () => void;
  onDateSelect: (date: Value) => void;
}

function CustomCalendar({ isVisible, onClose, onDateSelect }: CalendarProps) {
  const today = new Date();
  const [date, setDate] = useState<Value>([today, today]);
  const [isMounted, setIsMounted] = useState(false);
  const [activeStartDate, setActiveStartDate] = useState<Date>(today);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const path = event.composedPath && event.composedPath();
      if (path && !path.includes(calendarRef.current!)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
    onDateSelect(newDate);
  };

  const handleSelectAllDates = () => {
    const startOfMonth = moment(activeStartDate).startOf('month').toDate();
    const endOfMonth = moment(activeStartDate).endOf('month').toDate();
    const fullMonthRange: [Date, Date] = [startOfMonth, endOfMonth];
    setDate(fullMonthRange);
    onDateSelect(fullMonthRange);
  };

  const minDate = today;

  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={calendarRef}
      className={`transition-transform duration-300 transform ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } absolute bottom-0 left-0 right-0 max-w-full bg-white shadow-xl rounded-t-lg`}
    >
      <div className="calendar-container p-4 border-t-4 border-primary-3 rounded-t-lg text-center p-[10px]">
        <p className="text-sm font-bold text-left text-[1.7rem]">
          약속 날짜 또는 범위를 선택해주세요
        </p>
      </div>
      <div className="p-4">
        <Calendar
          value={date}
          onChange={handleDateChange}
          formatDay={(locale, date) => moment(date).format('D')}
          formatYear={(locale, date) => moment(date).format('YYYY')}
          formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
          calendarType="gregory"
          locale="ko"
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
          minDetail="month"
          tileContent={({ date }) => moment(date).isSame(today, 'day') && null}
          minDate={minDate}
          onClickDay={handleDateChange}
          selectRange={true}
          onActiveStartDateChange={({ activeStartDate }) =>
            setActiveStartDate(activeStartDate as Date)
          }
        />
      </div>
      <button
        className="absolute top-[54px] right-[115px] bg-[#efefef] text-black font-light text-[1.1rem] py-2 px-4 rounded-[6px] flex items-center justify-center"
        onClick={handleSelectAllDates}
      >
        이 달 안에
      </button>
    </div>
  );
}

export default CustomCalendar;
