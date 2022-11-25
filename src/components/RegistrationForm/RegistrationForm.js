import GoogleLogo from '../../images/googleLogo.svg';
import eyeOpened from '../../images/eye.svg';
import eyeClosed from '../../images/eye-blocked.svg';
import { Button } from 'components';
import s from './RegistrationForm.module.css';

import { useDispatch } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

import { handleRegistration, handleGoogleRegistration } from '../../redux/auth/auth-operations';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must contain 6 or more characters!')
    .required('Password is required'),
});

const RegistrationForm = () => {
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

  // const login = useGoogleLogin({
  //   onSuccess: tokenResponse => {
  //     const data = {
  //       email: tokenResponse.email,
  //       password: tokenResponse.id,
  //     };
  //     dispatch(authOperations.register(data));
  //   },
  // });

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
          dispatch(handleRegistration(values)).then(a =>
            setErrorMessage(a?.payload?.response?.data?.message)
          );
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
              min-length="6"
              required
              id="name"
            />
            {errors.name && touched.name ? (
              <div className={s.errorMessage}>* {errors.name}</div>
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
            {errorMessage && !touched.email ? (
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
              <Button
                text={'Register'}
                width={182}
                onClick={() => {
                  handleSubmit();
                }}
              />

              <button
                onClick={() => {
                  dispatch(handleGoogleRegistration());
                }}
                className={s.googleBtn}
                type="button"
              >
                <img src={GoogleLogo} alt="Google logo" />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegistrationForm;
