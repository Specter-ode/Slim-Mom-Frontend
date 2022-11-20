import s from './HomePage.module.css';
import CalculatorСalorieForm from 'components/DailyCaloriesForm/DailyCaloriesForm';

const HomePage = () => {
  return (
    <main className={s.container}>
      <h3 className={s.title}>HomePage </h3>
      <CalculatorСalorieForm />
    </main>
  );
};

export default HomePage;
