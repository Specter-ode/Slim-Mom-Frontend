import GoogleLogo from '../../images/googleLogo.svg';
import { useDispatch } from 'react-redux';
import s from './LogInForm.module.css';
import { authOperations } from 'redux/auth';
import { useGoogleLogin } from '@moeindana/google-oauth';
import eyeOpened from '../../images/eye.svg';
import eyeClosed from '../../images/eye-blocked.svg';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(8, 'Password must contain 8 or more characters!')
        .required('Required'),
});

export default function LogInForm() {
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

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            const data = {
                email: tokenResponse.email,
                password: tokenResponse.id,
            };
            dispatch(authOperations.register(data));
        },
    });

    let submitAction;

    const [errorMessage, setErrorMessage] = useState('');

    // console.log(process.env.REACT_APP_CLIENT_ID);

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    if (submitAction === 'login') {
                        dispatch(authOperations.logIn(values)).then(data => {
                            setErrorMessage(data?.payload);
                        });
                    }
                    if (submitAction === 'registration') {
                        dispatch(authOperations.register(values));
                    }
                    actions.resetForm();
                }}
            >
                {({ handleSubmit, errors, touched }) => (
                    <Form className={s.loginForm}>
                        <p className={s.googleText}>
                            You can log in with your Google Account:
                        </p>
                        <button
                            onClick={() => {
                                login();
                            }}
                            className={s.googleBtn}
                            type="button"
                        >
                            <img src={GoogleLogo} alt="Google logo" />
                        </button>
                        <p className={s.formText}>
                            Or log in using an email and password, after
                            registering:
                        </p>
                        <label htmlFor="email" className={s.formLabel}>
                            {(errors.email && touched.email) ||
                            (errorMessage &&
                                errorMessage !== 'Password is wrong' &&
                                !touched.email) ? (
                                <span className={s.errorStar}>*</span>
                            ) : null}
                            Email:
                        </label>
                        <Field
                            className={s.formInput}
                            type="email"
                            name="email"
                            title="Please enter valid email address, for example  'example@gmail.com'"
                            placeholder="your@email.com"
                            min-length="6"
                            required
                            id="email"
                        />
                        {errors.email && touched.email ? (
                            <div className={s.errorMessage}>{errors.email}</div>
                        ) : null}
                        {errorMessage &&
                        errorMessage !== 'Password is wrong' &&
                        !touched.email ? (
                            <div className={s.errorMessage}>{errorMessage}</div>
                        ) : null}

                        <label htmlFor="password" className={s.formLabel}>
                            {(errors.password && touched.password) ||
                            (errorMessage &&
                                errorMessage === 'Password is wrong' &&
                                !touched.password) ? (
                                <span className={s.errorStar}>*</span>
                            ) : null}{' '}
                            Password:
                        </label>
                        <Field
                            className={s.formInput}
                            type={isPswdShown ? 'text' : 'password'}
                            name="password"
                            title="Please enter your password. Minimum length 8 symbols"
                            placeholder="Password"
                            min-length="8"
                            required
                            id="password"
                        />
                        <button
                            className={s.pswdVisBtn}
                            onClick={changePswdVisibility}
                            type="button"
                        >
                            <img
                                className={s.pswdBtnImg}
                                src={isPswdShown ? eyeOpened : eyeClosed}
                                alt="Button show/hide password"
                            />
                        </button>
                        {errors.password && touched.password ? (
                            <div className={s.errorMessage}>
                                {errors.password}
                            </div>
                        ) : null}
                        {errorMessage &&
                        errorMessage === 'Password is wrong' &&
                        !touched.password ? (
                            <div className={s.errorMessage}>{errorMessage}</div>
                        ) : null}

                        <div className={s.btnCont}>
                            <button
                                type="button"
                                onClick={() => {
                                    submitAction = 'login';
                                    handleSubmit();
                                }}
                                className={s.formBtn}
                            >
                                LOG IN
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    submitAction = 'registration';
                                    handleSubmit();
                                }}
                                className={s.formBtn}
                            >
                                REGISTRATION
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            {/* <form className={s.loginForm}>
                <p className={s.googleText}>
                    You can log in with your Google Account:
                </p>
                <button
                    onClick={() => {
                        login();
                    }}
                    className={s.googleBtn}
                    type="button"
                >
                    <img src={GoogleLogo} alt="Google logo" />
                </button>
                <p className={s.formText}>
                    Or log in using an email and password, after registering:
                </p>
                <label className={s.formLabel}>
                    Email:
                    <input
                        className={s.formInput}
                        type="email"
                        name="email"
                        value={formFields.email}
                        onChange={handleChange}
                        title="Please enter valid email address, for example  'example@gmail.com'"
                        placeholder="your@email.com"
                        min-length="6"
                        required
                    />
                </label>
                <label className={s.formLabel}>
                    Password:
                    <input
                        className={s.formInput}
                        type="password"
                        name="password"
                        value={formFields.password}
                        onChange={handleChange}
                        title="Please enter your password. Minimum length 8 symbols"
                        placeholder="Password"
                        min-length="8"
                        required
                    />
                </label>
                <div className={s.btnCont}>
                    <button onClick={onLoginHandle} className={s.formBtn}>
                        LOG IN
                    </button>
                    <button className={s.formBtn} onClick={onRegisterHandle}>
                        REGISTRATION
                    </button>
                </div>
            </form> */}
        </>
    );
}
