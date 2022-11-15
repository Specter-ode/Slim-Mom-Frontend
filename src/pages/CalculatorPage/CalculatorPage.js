import s from './CalculatorPage.module.css';
import CalculatorСalorieForm from 'components/CalculatorСalorieForm/CalculatorСalorieForm';
import SideBar from 'components/SideBar/SideBar';

const CalculatorPage = () => {
  return (
    <main>
      <h3 className={s.title}>CalculatorPage </h3>
      <CalculatorСalorieForm />
      <SideBar />
    </main>
  );
};

export default CalculatorPage;
