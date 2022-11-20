import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import CircleLoader from 'react-spinners/CircleLoader';
import PublicRoute from 'components/PublicRoute/PublicRoute';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() => import('../pages/RegistrationPage/RegistrationPage'));
const CalculatorPage = lazy(() => import('../pages/CalculatorPage/CalculatorPage'));
const DiaryPage = lazy(() => import('../pages/DiaryPage/DiaryPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

const PagesRoutes = () => {
  const spinnerStyles = {
    display: 'block',
    margin: '100px auto',
  };
  return (
    <Suspense
      fallback={
        <CircleLoader
          cssOverride={spinnerStyles}
          color="#ff9406"
          loading
          size={300}
          aria-label="Loading Spinner"
          speedMultiplier={0.7}
        />
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/diary" element={<DiaryPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default PagesRoutes;
