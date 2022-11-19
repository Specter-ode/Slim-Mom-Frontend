import React from 'react';
import Container from './Container/Container';
import Header from './Header/Header';
import PagesRoutes from 'PagesRoutes/PagesRoutes';
import { ToastContainer, Zoom } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import BurgerMenu from 'components/BurgerMenu/BurgerMenu';
import Background from './Background/Background';

const App = () => {
  const BurgerMenuVision = false;

  return (
    <>
      <Background>
        <Header />
        {BurgerMenuVision ? (
          <BurgerMenu />
        ) : (
          <Container>
            <PagesRoutes />
          </Container>
        )}
      </Background>
      <ToastContainer
        autoClose={2000}
        hideProgressBar
        position="top-center"
        theme="colored"
        transition={Zoom}
      />
    </>
  );
};
export default App;
