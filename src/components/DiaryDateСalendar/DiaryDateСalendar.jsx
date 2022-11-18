import s from './DiaryDateСalendar.module.css';
import DatePicker from 'react-datepicker';
import { ReactComponent as NewCalendar } from 'assets/icons/calendar.svg';
import 'react-datepicker/dist/react-datepicker.css';

const DiaryDateСalendar = (date, setDate) => {
  return (
    <div className={s.block}>
      <NewCalendar className={s.icon} />
      <DatePicker
        className={s.calendar}
        dateFormat="dd/MM/yyyy"
        maxDate={new Date()}
        selected={date}
        onChange={date => setDate(date)}
      />
    </div>
  );
};

export default DiaryDateСalendar;
