import s from './CalculatorPage.module.css';
import { DailyCaloriesForm, SideBar } from 'components';

const CalculatorPage = () => {
  return (
    <main  className={s.container}>
      <DailyCaloriesForm />
      <SideBar />
    </main>
  );
};

export default CalculatorPage;
