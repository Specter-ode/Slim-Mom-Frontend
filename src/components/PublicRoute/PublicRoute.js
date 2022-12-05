import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLoginStatus, getUserDailyDiet } from 'redux/auth/auth-selector';

const PublicRoute = () => {
  const isLogin = useSelector(getLoginStatus);
  const isDailyDiet = useSelector(getUserDailyDiet);
  return (
    <>
      {!isLogin ? (
        <Outlet />
      ) : isDailyDiet?.calories ? (
        <Navigate to="/diary" />
      ) : (
        <Navigate to="/calculator" />
      )}
    </>
  );
};

export default PublicRoute;
