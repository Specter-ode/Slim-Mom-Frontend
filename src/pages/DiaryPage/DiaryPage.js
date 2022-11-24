import { useState } from 'react';

import useWindowDimensions from '../../services/hooks/useWindowDimensions';
import {
  ButtonPlus,
  DiaryAddProductForm,
  DiaryDateСalendar,
  DiaryProductsList,
  SideBar,
} from '../../components';
import s from './DiaryPage.module.css';

const DiaryPage = () => {
  const { width } = useWindowDimensions();
  const [date, setDate] = useState(() => new Date());
  // console.log('date: ', date);
  return (
    <main className={s.main}>
      <div className={s.diary}>
        <DiaryDateСalendar date={date} setDate={setDate} />

        {width > 767 && <DiaryAddProductForm date={date} />}

        <DiaryProductsList date={date} />

        {width < 768 && <ButtonPlus />}
      </div>

      <SideBar date={date} />
    </main>
  );
};

export default DiaryPage;
