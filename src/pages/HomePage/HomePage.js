import s from './HomePage.module.css';
import { Container, DailyCaloriesForm } from 'components';

const HomePage = () => {
  return (
    <main className={s.container}>
      <Container>
        <h3 className={s.title}>HomePage </h3>
        <DailyCaloriesForm />
      </Container>
    </main>
  );
};

export default HomePage;
