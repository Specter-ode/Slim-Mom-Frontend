import s from './LoginForm.module.css';

const LoginForm = () => {

  return (
      <form className={s.form} >
        <button type="submit" className={s.btn}>
          Submit
        </button>
      </form>
  );
};

export default LoginForm;
