import { Container, DiaryAddProductForm } from 'components';
import s from './DiaryMobileForm.module.css';

const DiaryMobileForm = () => {
  return (
    <Container>
      <main className={s.main}>
        <DiaryAddProductForm />
      </main>
    </Container>
  );
};

export default DiaryMobileForm;
