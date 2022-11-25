import s from './RegistrationPage.module.css';
import RegistrationForm from 'components/RegistrationForm/RegistrationForm';

const RegistrationPage = () => {
  return (
    <main>
      <div className={s.container}>
        <h3 className={s.title}>Register</h3>
        <RegistrationForm />
      </div>
    </main>
  );
};

export default RegistrationPage;
