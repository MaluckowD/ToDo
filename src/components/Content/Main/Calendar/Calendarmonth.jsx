import React from "react";
import { Calendar } from 'primereact/calendar';
import s from "./Calendar.module.css";
import useStore from "../../../../store/useToDoStore.js";
const CalendarMonth = () => {
  const updateMonthYear = useStore((state) => state.updateMonthYear)
  const handleDateChange = (event) => {
    if (updateMonthYear) {
      const selectedMonth = event.value.getMonth();
      const selectedYear = event.value.getFullYear();
      updateMonthYear(selectedMonth, selectedYear);
    }
  };

  return (
    <div className={s.item}>
      <Calendar
        className={s.month}
        onChange={handleDateChange}
        view="month"
        dateFormat="mm/yy"
      />
    </div>
  );
};

export default CalendarMonth
