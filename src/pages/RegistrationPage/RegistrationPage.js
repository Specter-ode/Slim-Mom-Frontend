import s from './RegistrationPage.module.css';
import RegistrationForm from 'components/RegistrationForm/RegistrationForm';
import { useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

const RegistrationPage = () => {
  // const dispatch = useDispatch();

  return (
    <main>
      <div className={s.container}>
        <h3>RegistrationPage</h3>
        <RegistrationForm />
      </div>
    </main>
  );
};

export default RegistrationPage;
