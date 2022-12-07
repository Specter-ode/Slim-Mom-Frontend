import s from './RegistrationPage.module.css';
import RegistrationForm from 'components/RegistrationForm/RegistrationForm';
import { getLoadingStatus, getRegistrationStatus, getUser } from 'redux/auth/auth-selector';
import { useSelector } from 'react-redux';
import { Button, Loader } from 'components';
import instance from 'services/api/auth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const RegistrationPage = () => {
  const isLoading = useSelector(getLoadingStatus);
  const registrationStatus = useSelector(getRegistrationStatus);
  const user = useSelector(getUser);
  const [block, setBlock] = useState(false);
  const [sec, setSec] = useState(10);
  const [text, setText] = useState('Сlick to resend');

  const tick = () => {
    if (sec <= 0) {
      setText('Сlick to resend');
      setBlock(false);
      setSec(10);
    } else {
      setSec(sec - 1);
      setText(sec);
    }
  };

  useEffect(() => {
    if (block) {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    }
  });

  const component = (
    <>
      {registrationStatus ? (
        <>
          <div className={s.infoContainer}>
            <h3 className={s.title}>
              {user.name}, thank you for registration. We've sent you a verification email.
            </h3>
            <p className={s.text}>If you've not recieve this email</p>
            <Button
              isPrimaryButton={false}
              text={`${text}`}
              width={182}
              isDisabled={block}
              onClick={async () => {
                try {
                  const result = await instance.post('/users/verify', { email: user.email });
                  setBlock(true);
                  toast.success(result.data.message);
                } catch (error) {
                  console.log(error);
                  toast.error(error.response?.data?.message);
                }
              }}
            />
          </div>
        </>
      ) : (
        <>
          <h3 className={s.title}>Register</h3>
          <RegistrationForm />
        </>
      )}
    </>
  );

  return (
    <main>
      <div className={s.container}>
        {isLoading ? (
          <div className={s.block}>
            <Loader />
          </div>
        ) : (
          component
        )}
      </div>
    </main>
  );
};

export default RegistrationPage;
