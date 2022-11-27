import s from './HomePage.module.css';
import { Container, DailyCaloriesForm } from 'components';

const HomePage = () => {
  return (
    <main className={s.container}>
      <Container>
        <DailyCaloriesForm />
      </Container>
    </main>
  );
};

export default HomePage;
