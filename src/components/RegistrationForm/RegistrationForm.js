import GoogleLogo from '../../assets/icons/googleLogo.svg';
import FacebookText from '../../assets/icons/facebookText.svg';
import eyeOpened from '../../assets/icons/eye.svg';
import eyeClosed from '../../assets/icons/eye-blocked.svg';
import { Button } from 'components';
import s from './RegistrationForm.module.css';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { handleRegistration } from '../../redux/auth/auth-operations';

const { REACT_APP_BACKEND_URL = 'http://localhost:4000/aoi' } = process.env;

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name length must be at least 2 characters long')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must contain 6 or more characters!')
    .required('Password is required'),
});

const RegistrationForm = () => {
  const [isPswdShown, setIsPswdShown] = useState(false);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          dispatch(handleRegistration(values)).then(a => {
            if (a?.type === 'users/signup/rejected') {
              setErrorMessage(a?.payload);
            }
            console.log(errorMessage);
          });
          actions.resetForm();
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form className={s.loginForm}>
            <Field
              className={s.formInput}
              type="name"
              name="name"
              title="Please enter your name or nickname'"
              placeholder="Name *"
              min-length="2"
              required
              id="name"
            />
            {errors.name && touched.name ? (
              <div className={s.errorMessage}>* {errors.name}</div>
            ) : null}
            {(errorMessage !== '"email" must be a valid email' ||
              errorMessage !== 'Email in use') &&
            !touched.name ? (
              <div className={s.errorMessage}>{errorMessage}</div>
            ) : null}

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
            {(errorMessage === '"email" must be a valid email' ||
              errorMessage === 'Email in use') &&
            !touched.email ? (
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
            <button
              className={s.pswdVisBtn}
              onClick={() => {
                setIsPswdShown(!isPswdShown);
              }}
              type="button"
            >
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
              <Button
                isPrimaryButton={false}
                text={'Register'}
                width={182}
                onClick={() => {
                  handleSubmit();
                }}
              />
              <a className={s.googleBtn} href={`${REACT_APP_BACKEND_URL}/users/google`}>
                <img className={s.googleLogo} src={GoogleLogo} alt="Google logo" />
              </a>
              <a className={s.googleBtn} href={`${REACT_APP_BACKEND_URL}/users/facebook`}>
                <img className={s.googleLogo} src={FacebookText} alt="Facebook logo" />
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegistrationForm;
