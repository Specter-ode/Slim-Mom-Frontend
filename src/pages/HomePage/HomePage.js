import s from './HomePage.module.css';
import CalculatorСalorieForm from 'components/DailyCaloriesForm/DailyCaloriesForm';
// import CalculatorСalorieForm2 from 'components/DailyCaloriesForm/DailyCaloriesForm2';
// import { useDispatch } from 'react-redux';

const HomePage = () => {
  // const dispatch = useDispatch()
  // const addData = data => {
  //   console.log('data: ', data);
  // };

  return (
    <main className={s.container}>
      <h3 className={s.title}>HomePage </h3>
      <CalculatorСalorieForm />
      {/* <CalculatorСalorieForm2 handleSubmit={addData} /> */}
    </main>
  );
};

export default HomePage;
