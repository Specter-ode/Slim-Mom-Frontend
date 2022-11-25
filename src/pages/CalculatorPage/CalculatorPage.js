import s from './CalculatorPage.module.css';
import { DailyCaloriesForm, SideBar } from 'components';

const CalculatorPage = () => {
  return (
    <main>
      <h3 className={s.title}>Calculator Page</h3>
      <DailyCaloriesForm />
      <SideBar />
    </main>
  );
};

export default CalculatorPage;
