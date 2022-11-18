import s from './HomePage.module.css';
import CalculatorСalorieForm from 'components/DailyCaloriesForm/DailyCaloriesForm';
import BurgerMenu from 'components/BurgerMenu/BurgerMenu';
const HomePage = () => {
  return (
    <main>
      <h3 className={s.title}>HomePage </h3>
      {/* <BurgerMenu /> */}
      <CalculatorСalorieForm />
    </main>
  );
};

export default HomePage;
