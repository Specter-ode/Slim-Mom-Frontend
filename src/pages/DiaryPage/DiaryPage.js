import s from './DiaryPage.module.css';
import SideBar from 'components/SideBar/SideBar';
import DiaryAddProductForm from 'components/DiaryAddProductForm/DiaryAddProductForm';
import DiaryDateСalendar from 'components/DiaryDateСalendar/DiaryDateСalendar';
import DiaryProductsList from 'components/DiaryProductsList/DiaryProductsList';
import { useState } from 'react';

const DiaryPage = () => {
  const [date, setDate] = useState(() => new Date());
  console.log('date: ', date);
  return (
    <main>
      <h3 className={s.title}>DiaryPage </h3>
      <DiaryDateСalendar date={date} setDate={setDate} />
      <DiaryAddProductForm date={date} />
      <DiaryProductsList date={date} />
      <SideBar date={date} />
    </main>
  );
};

export default DiaryPage;
