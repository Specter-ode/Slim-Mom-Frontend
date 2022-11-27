import s from './CalculatorPage.module.css';
import { DailyCaloriesForm, SideBar, Container } from 'components';

const CalculatorPage = () => {
  return (
    <section className={s.section}>
      <Container>
        <h3 className="visually-hidden">Calculator Page</h3>
        <div className={s.flex}>
          <DailyCaloriesForm />
          <SideBar />
        </div>
      </Container>
    </section>
  );
};

export default CalculatorPage;
