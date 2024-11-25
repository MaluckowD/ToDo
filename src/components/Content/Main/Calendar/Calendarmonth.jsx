import React, { useState, useRef } from "react";
import { Calendar } from 'primereact/calendar';
import s from "./Calendar.module.css";

const CalendarMonth = ({ updateMonthAndYear, year}) => {
  const handleDateChange = (event) => {
    if (updateMonthAndYear) {
      const selectedMonth = event.value.getMonth();
      const selectedYear = event.value.getFullYear();
      updateMonthAndYear(selectedMonth, selectedYear);
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
