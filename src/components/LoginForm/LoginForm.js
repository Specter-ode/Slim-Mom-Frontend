import GoogleLogo from '../../assets/icons/googleLogo.svg';
import FacebookText from '../../assets/icons/facebookText.svg';
import eyeOpened from '../../assets/icons/eye.svg';
import eyeClosed from '../../assets/icons/eye-blocked.svg';
import s from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { handleLogin } from '../../redux/auth/auth-operations';
import { Link } from 'react-router-dom';

const { REACT_APP_BACKEND_URL = 'http://localhost:4000/api' } = process.env;

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must contain 6 or more characters!')
    .required('Password is required'),
});

const LoginForm = () => {
  const [isPswdShown, setIsPswdShown] = useState(false);
  const changePswdVisibility = () => {
    if (isPswdShown === false) {
      setIsPswdShown(true);
    }
    if (isPswdShown === true) {
      setIsPswdShown(false);
    }
  };
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState('');

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          dispatch(handleLogin(values)).then(a => setErrorMessage(a?.payload));
          actions.resetForm();
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form className={s.loginForm}>
            <Field
              className={s.formInput}
              type="email"
              name="email"
              title="Please enter valid email address, for example  'example@gmail.com'"
              placeholder="Email *"
              min-length="6"
              required
              id="email"
            />
            {errors.email && touched.email ? (
              <div className={s.errorMessage}>* {errors.email}</div>
            ) : null}
            {errorMessage && !touched.email && !touched.password ? (
              <div className={s.errorMessage}>{errorMessage}</div>
            ) : null}

            <Field
              className={s.formInput + ' ' + s.passInput}
              type={isPswdShown ? 'text' : 'password'}
              name="password"
              title="Please enter your password. Minimum length 8 symbols"
              placeholder="Password *"
              min-length="8"
              required
              id="password"
            />
            <button className={s.pswdVisBtn} onClick={changePswdVisibility} type="button">
              <img
                className={s.pswdBtnImg}
                src={isPswdShown ? eyeOpened : eyeClosed}
                alt="Button show/hide password"
              />
            </button>
            {errors.password && touched.password ? (
              <div className={s.errorMessage}>* {errors.password}</div>
            ) : null}
            {errorMessage && errorMessage === 'Password is wrong' && !touched.password ? (
              <div className={s.errorMessage}>{errorMessage}</div>
            ) : null}
            <div className={s.btnCont}>
              <button
                className={s.btn}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Login
              </button>
              <Link to="/forgot-password" className={s.btn}>
                Forgot password
              </Link>
            </div>
            <div className={s.btnCont}>
              <a className={s.btn} href={`${REACT_APP_BACKEND_URL}/users/google`}>
                <img className={s.socialLogo} src={GoogleLogo} alt="Google logo" />
              </a>
              <a className={s.btn} href={`${REACT_APP_BACKEND_URL}/users/facebook`}>
                <img className={s.socialLogo} src={FacebookText} alt="Facebook logo" />
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
