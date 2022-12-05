import s from './ForgotPasswordPage.module.css';
import { ReactComponent as BackArrow } from 'assets/icons/back-arrow.svg';
import ForgotPasswordForm from 'components/ForgotPasswordForm/ForgotPasswordForm';
import { getLoadingStatus, gettEmailOnCheck, getPasswordStatus } from 'redux/auth/auth-selector';
import { useSelector } from 'react-redux';
import { Loader } from 'components';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { getActivationKey, getKeyVerify, saveNewPassword } from 'redux/auth/auth-operations';

const ForgotPasswordPage = () => {
  const passwordStatus = useSelector(getPasswordStatus);
  const isLoading = useSelector(getLoadingStatus);
  const emailOnCheck = useSelector(gettEmailOnCheck);

  const dispatch = useDispatch();
  const sendEmail = email => {
    dispatch(getActivationKey(email));
  };
  const checkKeyStatus = key => {
    dispatch(getKeyVerify(key));
  };
  const createNewPassword = password => {
    dispatch(saveNewPassword({ password, email: emailOnCheck }));
  };
  return (
    <main>
      <div className={s.container}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Link to="/login">
              <BackArrow className={s.icon} />
            </Link>
            <h3 className={s.title}>Forgot password</h3>
            <ForgotPasswordForm
              handleSubmitEmail={sendEmail}
              handleSubmitKey={checkKeyStatus}
              handleSubmitPassword={createNewPassword}
            />
          </>
        )}
      </div>
      {passwordStatus && <Navigate to="/login" />}
    </main>
  );
};

export default ForgotPasswordPage;
