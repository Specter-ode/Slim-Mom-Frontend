import s from './CalculatorPage.module.css';
import { DailyCaloriesForm, SideBar } from 'components';

const CalculatorPage = () => {
  return (
    <main>
      <DailyCaloriesForm />
      <SideBar />
    </main>
  );
};

export default CalculatorPage;
