import s from './RegistrationForm.module.css';

const RegistrationForm = () => {
  return (
    <form className={s.form}>
      <button type="submit" className={s.btn}>
        Submit
      </button>
    </form>
  );
};

export default RegistrationForm;
