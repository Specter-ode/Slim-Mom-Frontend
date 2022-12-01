import s from './LoginPage.module.css';
import LoginForm from 'components/LoginForm/LoginForm';
import { getLoadingStatus } from 'redux/auth/auth-selector';
import { useSelector } from 'react-redux';
import { Loader } from 'components';

const LoginPage = () => {
  const isLoading = useSelector(getLoadingStatus);
  const component = (
    <>
      <h3 className={s.title}>Sign In</h3>
      <LoginForm />
    </>
  );

  return (
    <main>
      <div className={s.container}>{isLoading ? <Loader /> : component}</div>
    </main>
  );
};

export default LoginPage;
