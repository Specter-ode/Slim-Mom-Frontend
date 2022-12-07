import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicRoute from 'components/PublicRoute/PublicRoute';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import { PageLoader } from 'components';
import { getLoginStatus, getUserDailyDiet } from 'redux/auth/auth-selector';
import { useSelector } from 'react-redux';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() => import('../pages/RegistrationPage/RegistrationPage'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage/ForgotPasswordPage'));
const CalculatorPage = lazy(() => import('../pages/CalculatorPage/CalculatorPage'));
const DiaryMobileForm = lazy(() => import('../pages/DiaryMobileForm/DiaryMobileForm'));
const DiaryPage = lazy(() => import('../pages/DiaryPage/DiaryPage'));
const DevelopersPage = lazy(() => import('../pages/DevelopersPage/DevelopersPage'));

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
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/diary-mobile-form" element={<DiaryMobileForm />} />
          <Route path="/developers" element={<DevelopersPage />} />
        </Route>

        <Route path="*" element={correctComponent} />
      </Routes>
    </Suspense>
  );
};

export default PagesRoutes;
