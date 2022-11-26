import s from './DiaryDateСalendar.module.css';
import DatePicker from 'react-datepicker';
import { ReactComponent as NewCalendar } from 'assets/icons/calendar.svg';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDate } from '../../redux/products/products-slice';

const DiaryDateСalendar = () => {
  const dispatch = useDispatch();
  const [dateObject, setDateObject] = useState(() => new Date());

  useEffect(() => {
    if (!dateObject) return;
    dispatch(setDate(dateObject.toISOString().slice(0, 10)));
  }, [dispatch, dateObject]);

  return (
    <div className={s.block}>
      <DatePicker
        className={s.calendar}
        dateFormat="dd.MM.yyyy"
        maxDate={new Date()}
        selected={dateObject}
        onChange={date => setDateObject(date)}
      />
      <NewCalendar className={s.icon} />
    </div>
  );
};

export default DiaryDateСalendar;
