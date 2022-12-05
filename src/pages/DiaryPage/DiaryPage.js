import { useNavigate } from 'react-router-dom';

import useWindowDimensions from '../../services/hooks/useWindowDimensions';
import {
  ButtonPlus,
  Container,
  DiaryAddProductForm,
  DiaryDateСalendar,
  DiaryProductsList,
  SideBar,
  Footer,
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
          <h1 className="visually-hidden">Diary Page</h1>
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
              <SideBar /> <Footer />
            </Container>
          </div>
        </main>
      )}

      {width > 1279 && (
        <>
          <Container>
            <main className={s.main}>
              <div className={s.diary}>
                <DiaryDateСalendar location="diary" />
                <DiaryAddProductForm />
                <DiaryProductsList />
              </div>

              <SideBar />
            </main>
            <Footer />
          </Container>
        </>
      )}
    </>
  );
};

export default DiaryPage;
