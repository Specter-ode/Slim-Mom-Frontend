import s from './RegistrationPage.module.css';
import RegistrationForm from 'components/RegistrationForm/RegistrationForm';
import { getLoadingStatus } from 'redux/auth/auth-selector';
import { useSelector } from 'react-redux';
import { Loader } from 'components';

const RegistrationPage = () => {
  const isLoading = useSelector(getLoadingStatus);
  const component = (
    <>
      <h3 className={s.title}>Register</h3>
      <RegistrationForm />
    </>
  );
  return (
    <main>
      <div className={s.container}>{isLoading ? <Loader /> : component}</div>
    </main>
  );
};

export default RegistrationPage;
