import s from './LoginPage.module.css';
import LoginForm from 'components/LoginForm/LoginForm';
// import { useDispatch } from 'react-redux';

const LoginPage = () => {
  // const dispatch = useDispatch();

  return (
    <main>
      <div className={s.container}>
        <h3>LoginPage </h3>

        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
