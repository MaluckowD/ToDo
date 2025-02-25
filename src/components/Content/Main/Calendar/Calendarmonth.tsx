import { Calendar } from 'primereact/calendar';
import s from "./Calendar.module.css";
import useStore from "../../../../store/useToDoStore";
const CalendarMonth = () => {
  
  const handleDateChange = useStore((state) => state.handleDateChange)

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
