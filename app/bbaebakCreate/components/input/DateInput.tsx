'use client';
import moment from 'moment';
import { useState } from 'react';
import CustomCalendar from '../calendar/Calendar';
import Input from './Input';

interface Props {
  value: any;
  onChange: any;
  error?: string;
}

function DateInput({ value, onChange, error }: Props) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const handleDateSelect = (date: any) => {
    if (Array.isArray(date)) {
      onChange(
        `${moment(date[0]).format('M월 D일')}부터 ${moment(date[1]).format('M월 D일')} 중에`
      );
    } else {
      onChange(moment(date).format('M월 D일에'));
    }
  };

  return (
    <div className="flex justify-center">
      <Input
        value={value || ''}
        onChange={() => {}}
        error={error}
        placeholder="언제"
        onClick={() => setIsCalendarOpen(true)}
        containerClassName="w-[210px]"
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
