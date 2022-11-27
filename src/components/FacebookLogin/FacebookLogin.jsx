// const { REACT_APP_URL = 'http://localhost:4000' } = process.env;
// const URL = `${REACT_APP_URL}/api/users/facebook`;
import { useDispatch } from 'react-redux';
import { handleFacebookRegistration } from 'redux/auth/auth-operations';

const FacebookLogin = () => {
  const dispatch = useDispatch();
  const loginByFacebook = dispatch(handleFacebookRegistration());
  return (
    <button type="button" onClick={() => loginByFacebook}>
      Login By Facebook
    </button>
  );
};

export default FacebookLogin;
