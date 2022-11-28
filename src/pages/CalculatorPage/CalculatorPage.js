import useWindowDimensions from '../../services/hooks/useWindowDimensions';
import s from './CalculatorPage.module.css';
import { DailyCaloriesForm, SideBar, Container } from 'components';

const CalculatorPage = () => {
  const { width } = useWindowDimensions();

  return (
    <>
      {width < 1280 && (
        <section className={s.section}>
          <h1 className="visually-hidden">Calculator Page</h1>
          <div className={s.calculator}>
            <Container>
              <DailyCaloriesForm />
            </Container>
          </div>
          <div className={s.sidebar}>
            <Container>
              <SideBar />
            </Container>
          </div>
        </section>
      )}
      {width > 1279 && (
        <Container>
          <section className={s.section}>
            <h3 className="visually-hidden">Calculator Page</h3>
            <div className={s.calculator}>
              <DailyCaloriesForm />
            </div>
            <SideBar />
          </section>
        </Container>
      )}
    </>
  );
};

export default CalculatorPage;
