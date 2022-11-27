import s from './HomePage.module.css';
import { Container, DailyCaloriesForm, FacebookLogin } from 'components';

const HomePage = () => {
  return (
    <main className={s.container}>
      <FacebookLogin />
      <Container>
        <h3 className={s.title}>HomePage </h3>
        <DailyCaloriesForm />
      </Container>
    </main>
  );
};

export default HomePage;
