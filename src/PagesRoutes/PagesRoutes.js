import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicRoute from 'components/PublicRoute/PublicRoute';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import { Loader } from 'components';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() => import('../pages/RegistrationPage/RegistrationPage'));
const CalculatorPage = lazy(() => import('../pages/CalculatorPage/CalculatorPage'));
const DiaryMobileForm = lazy(() => import('../pages/DiaryMobileForm/DiaryMobileForm'));
const DiaryPage = lazy(() => import('../pages/DiaryPage/DiaryPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

const PagesRoutes = () => {
  return (
    <Suspense fallback={<Loader height="100vh" />}>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/diary-mobile-form" element={<DiaryMobileForm />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default PagesRoutes;
