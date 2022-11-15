import React from 'react';
import Container from './Container/Container';
import Header from './Header/Header';
import PagesRoutes from 'PagesRoutes/PagesRoutes';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Container>
      <Header />
      <PagesRoutes />

      <ToastContainer
        autoClose={2000}
        hideProgressBar
        position="top-center"
        theme="colored"
        transition={Zoom}
      />
    </Container>
  );
};
export default App;
