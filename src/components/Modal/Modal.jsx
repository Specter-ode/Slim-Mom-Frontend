import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useSelector } from 'react-redux';
import { getLoadingStatus } from 'redux/auth/auth-selector';
import { Loader } from 'components';

import PropTypes from 'prop-types';

import closeIcon from '../../assets/icons/modal-close.svg';
import s from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, component }) {
  const isLoading = useSelector(getLoadingStatus);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const onBackdropClose = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div onClick={onBackdropClose} className={s.overlay}>
      <div className={s.modal}>
        <button type="button" onClick={onClose} className={s.button}>
          <svg className={s.icon} width={12} height={12}>
            <use href={closeIcon + '#close-modal-cross'}></use>
          </svg>
        </button>
        {isLoading ? <Loader /> : component}
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  component: PropTypes.node,
};
