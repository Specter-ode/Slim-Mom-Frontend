import s from './LoginPage.module.css';
import LoginForm from 'components/LoginForm/LoginForm';
import { getLoadingStatus } from 'redux/auth/auth-selector';
import { setPasswordStatus } from 'redux/auth/auth-slice';
import { useSelector } from 'react-redux';
import { Loader } from 'components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const LoginPage = () => {
  const isLoading = useSelector(getLoadingStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPasswordStatus(false));
  }, [dispatch]);

  const component = (
    <>
      <h3 className={s.title}>Sign In</h3>
      <LoginForm />
    </>
  );

  return (
    <main>
      <div className={s.container}>
        {isLoading ? (
          <div className={s.block}>
            <Loader />
          </div>
        ) : (
          component
        )}
      </div>
    </main>
  );
};

export default LoginPage;
