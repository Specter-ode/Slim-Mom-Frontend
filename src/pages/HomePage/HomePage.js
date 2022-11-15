import s from './HomePage.module.css';
import CalculatorСalorieForm from 'components/CalculatorСalorieForm/CalculatorСalorieForm';
const HomePage = () => {
  return (
    <main>
      <h3 className={s.title}>HomePage </h3>
      <CalculatorСalorieForm />
    </main>
  );
};

export default HomePage;
