import s from './ForgotPasswordForm.module.css';
import eyeOpened from 'assets/icons/eye.svg';
import eyeClosed from 'assets/icons/eye-blocked.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getEmailStatus, getKeyStatus } from 'redux/auth/auth-selector';
const ForgotPasswordForm = ({ handleSubmitEmail, handleSubmitKey, handleSubmitPassword }) => {
  const emailStatus = useSelector(getEmailStatus);
  const keyStatus = useSelector(getKeyStatus);

  const [state, setState] = useState({
    email: '',
    key: '',
    password: '',
    repeatPassword: '',
  });
  const { email, key, password, repeatPassword } = state;
  const [isPassShown, setIsPassShown] = useState(false);
  const [isRepeatPassShown, setIsRepeatPassShown] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSubmitEmail = e => {
    e.preventDefault();
    handleSubmitEmail(email);
  };
  const onSubmitKey = e => {
    e.preventDefault();
    handleSubmitKey(key);
  };
  const onSubmitPassword = e => {
    e.preventDefault();
    handleSubmitPassword(password);
  };

  const checkKeyDisabled = key.length !== 36;
  const checkEmail =
    email.length >= 8 && email.split('').includes('@') & email.split('').includes('.');
  const checkPassLength = password.length >= 8;
  const checkRepeatPassLength = repeatPassword.length >= 8;
  const samePassword =
    keyStatus && checkPassLength && checkRepeatPassLength && password !== repeatPassword;
  return (
    <>
      <div className={s.block}>
        {!emailStatus && <p className={s.text}>The activation key will be send to your email</p>}
        <form onSubmit={onSubmitEmail} className={s.form}>
          <input
            onChange={handleChange}
            className={s.formInput}
            id="email"
            type="text"
            name="email"
            value={email}
            required
            min-length="8"
            placeholder="Enter email of your account"
            title="Please enter valid email address, for example 'example@gmail.com'"
          />
          <button type="submit" disabled={!checkEmail} className={s.btn}>
            Send key
          </button>
        </form>
        {emailStatus && <p className={s.status}>The activation key sent to your email</p>}
      </div>
      {emailStatus && (
        <div className={s.block}>
          <form onSubmit={onSubmitKey} className={s.form}>
            <input
              onChange={handleChange}
              className={s.formInput}
              id="key"
              type="text"
              name="key"
              value={key}
              required
              title="Please enter activation key (36 symbols) "
              placeholder="Enter activation key from email message"
            />
            <button type="submit" disabled={checkKeyDisabled} className={s.btn}>
              Check key
            </button>
          </form>
          {keyStatus && <p className={s.status}>The activation key approved</p>}
        </div>
      )}
      {keyStatus && (
        <div className={s.block}>
          <form onSubmit={onSubmitPassword} className={s.form}>
            <label className={s.label} htmlFor="password">
              <input
                onChange={handleChange}
                id="password"
                name="password"
                value={password}
                className={s.formInput + ' ' + s.passInput}
                type={isPassShown ? 'text' : 'password'}
                title="Please enter your new password. Minimum length 8 symbols"
                placeholder="New password *"
                min-length="8"
                required
              />
              <button
                className={s.passVisBtn}
                onClick={() => {
                  setIsPassShown(!isPassShown);
                }}
                type="button"
              >
                <img
                  className={s.pswdBtnImg}
                  src={isPassShown ? eyeOpened : eyeClosed}
                  alt="Button show/hide password"
                />
              </button>
            </label>
            <label className={s.label} htmlFor="repeatPassword">
              <input
                onChange={handleChange}
                id="repeatPassword"
                name="repeatPassword"
                value={repeatPassword}
                className={s.formInput + ' ' + s.passInput}
                type={isRepeatPassShown ? 'text' : 'password'}
                title="Please repeat your new password. Minimum length 8 symbols"
                placeholder="Repeat new password *"
                min-length="8"
                required
              />
              <button
                className={s.passVisBtn}
                onClick={() => {
                  setIsRepeatPassShown(!isRepeatPassShown);
                }}
                type="button"
              >
                <img
                  className={s.pswdBtnImg}
                  src={isRepeatPassShown ? eyeOpened : eyeClosed}
                  alt="Button show/hide password"
                />
              </button>
            </label>

            <button type="submit" disabled={samePassword} className={s.btn}>
              Save password
            </button>
          </form>
          {samePassword && <p className={s.error}>Passwords are not the same. Check it</p>}
        </div>
      )}
    </>
  );
};

export default ForgotPasswordForm;
