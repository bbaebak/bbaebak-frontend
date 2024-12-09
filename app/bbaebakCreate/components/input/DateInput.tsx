'use client';
import { useState, useEffect } from 'react';
import CustomCalendar from '../calendar/Calendar';
import Input from './Input';
import moment from 'moment';

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
        `${moment(date[0]).format('YYYY년 MM월 DD일부터')} ${moment(date[1]).format('YYYY년 MM월 DD일 중')}`
      );
    } else {
      onChange(moment(date).format('YYYY년 MM월 DD일'));
    }
  };

  return (
    <div>
      <Input
        value={value || ''}
        onChange={() => {}}
        error={error}
        placeholder="언제"
        onClick={() => setIsCalendarOpen(true)}
        containerClassName="w-[200px]"
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
