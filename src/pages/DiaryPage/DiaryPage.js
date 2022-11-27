import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const { width } = useWindowDimensions();

  const handleMobileFormOpen = () => {
    navigate(`/diary-mobile-form`);
  };

  return (
    <main className={s.main}>
      <div className={s.diary}>
        <DiaryDateСalendar location="diary" />

        {width > 767 && <DiaryAddProductForm />}

        <DiaryProductsList />

        {width < 768 && <ButtonPlus type="button" onClick={handleMobileFormOpen} />}
      </div>

      <SideBar />
    </main>
  );
};

export default DiaryPage;
