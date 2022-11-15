import { Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { getToken } from 'redux/auth/auth-selector';

const PrivateRoute = () => {
  return <Outlet />;
  // const isToken = useSelector(getToken);
  // return <>{isToken ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PrivateRoute;
