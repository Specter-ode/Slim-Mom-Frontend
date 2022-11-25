import s from './LoginPage.module.css';
import LoginForm from 'components/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <main>
      <div className={s.container}>
        <h3 className={s.title}>Sign In</h3>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
