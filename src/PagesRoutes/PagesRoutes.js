import React, { lazy, Suspense } from 'react';
import { Routes, Route, redirect } from 'react-router-dom';

import PublicRoute from 'components/PublicRoute/PublicRoute';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import { Loader } from 'components';
import { getLoginStatus, getUserDailyDiet } from 'redux/auth/auth-selector';
import { useSelector } from 'react-redux';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() => import('../pages/RegistrationPage/RegistrationPage'));
const CalculatorPage = lazy(() => import('../pages/CalculatorPage/CalculatorPage'));
const DiaryMobileForm = lazy(() => import('../pages/DiaryMobileForm/DiaryMobileForm'));
const DiaryPage = lazy(() => import('../pages/DiaryPage/DiaryPage'));

const PagesRoutes = () => {
  const isLogin = useSelector(getLoginStatus);
  const isDailyDiet = useSelector(getUserDailyDiet);
  const correctComponent = !isLogin ? (
    <HomePage />
  ) : isDailyDiet ? (
    <DiaryPage />
  ) : (
    <CalculatorPage />
  );

  return (
    <Suspense fallback={<Loader height="100vh" />}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/diary-mobile-form" element={<DiaryMobileForm />} />
        </Route>
        <Route path="*" element={correctComponent} />
      </Routes>
    </Suspense>
  );
};

export default PagesRoutes;
