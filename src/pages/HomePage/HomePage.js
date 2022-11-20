import s from './HomePage.module.css';
import CalculatorСalorieForm from 'components/DailyCaloriesForm/DailyCaloriesForm';

const HomePage = () => {
  return (
    <main>
      <h3 className={s.title}>HomePage </h3>

      <CalculatorСalorieForm />
      <CalculatorСalorieFormSecondVariant />
    </main>
  );
};

export default HomePage;
