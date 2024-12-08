'use client';
import { useState } from 'react';
import CustomCalendar from '../calendar/Calendar';
import Input from './Input';

interface Props {
  value: Date | null;
  onChange: (date: Date) => void;
  error?: string;
}

function DateInput({ value, onChange, error }: Props) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateSelect = (selectedDate: any) => {
    if (Array.isArray(selectedDate)) {
      onChange(new Date(selectedDate[0]));
    } else {
      onChange(new Date(selectedDate));
    }
    setIsCalendarOpen(false);
  };

  const formattedDate = value
    ? new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(value)
    : '';

  return (
    <div className="relative">
      <Input
        value={formattedDate}
        onChange={() => {}}
        error={error}
        placeholder="언제"
        onClick={() => setIsCalendarOpen(true)}
        containerClassName="w-[120px]"
        suffix={<span className="text-gray-400"></span>}
        readonly
      />
      {isCalendarOpen && (
        <CustomCalendar
          isVisible={isCalendarOpen}
          onClose={() => setIsCalendarOpen(false)}
          onDateSelect={handleDateSelect}
        />
      )}
    </div>
  );
}

export default DateInput;
