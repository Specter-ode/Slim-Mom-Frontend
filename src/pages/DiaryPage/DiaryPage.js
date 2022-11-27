import { useNavigate } from 'react-router-dom';

import useWindowDimensions from '../../services/hooks/useWindowDimensions';
import {
  ButtonPlus,
  Container,
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
    <>
      {width < 1280 && (
        <main className={s.main}>
          <div className={s.diary}>
            <Container>
              <DiaryDateСalendar location="diary" />

              {width > 767 && <DiaryAddProductForm />}

              <DiaryProductsList />

              {width < 768 && <ButtonPlus type="button" onClick={handleMobileFormOpen} />}
            </Container>
          </div>

          <div className={s.sidebar}>
            <Container>
              <SideBar />
            </Container>
          </div>
        </main>
      )}

      {width > 1279 && (
        <Container>
          <main className={s.main}>
            <div className={s.diary}>
              <DiaryDateСalendar location="diary" />
              <DiaryAddProductForm />
              <DiaryProductsList />
            </div>

            <SideBar />
          </main>
        </Container>
      )}
    </>
  );
};

export default DiaryPage;
