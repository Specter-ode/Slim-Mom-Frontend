import s from './HomePage.module.css';
import CalculatorСalorieForm from 'components/DailyCaloriesForm/DailyCaloriesForm';

const HomePage = () => {
  return (
    <main>
      <div className={s.container}>
        <h3 className={s.title}>HomePage </h3>

        <CalculatorСalorieForm />
      </div>
    </main>
  );
};

export default HomePage;
