import s from './HomePage.module.css';

import { Container, DailyCaloriesForm } from 'components';

const HomePage = () => {
  return (
    <main>
      <section className={s.section}>
        <Container>
          <h3 className="visually-hidden">HomePage </h3>
          <DailyCaloriesForm />
        </Container>
      </section>
    </main>
  );
};

export default HomePage;
