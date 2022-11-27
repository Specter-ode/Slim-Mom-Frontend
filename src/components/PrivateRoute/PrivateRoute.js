import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLoginStatus } from 'redux/auth/auth-selector';

const PrivateRoute = () => {
  const isLogin = useSelector(getLoginStatus);
  return <>{isLogin ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PrivateRoute;
