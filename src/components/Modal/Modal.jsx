import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import { DailyCalorieIntake, Button } from 'components';

import PropTypes from 'prop-types';
import sprite from '../../assets/icons/sprite.svg';

import s from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose }) {
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

  const modalCloseButtonMobile = (
    <div className={s.mobileCloseBlock}>
      <button type="button" onClick={onClose} className={s.buttonMobile}>
        <svg className={s.icon} width={15} height={8}>
          <use href={sprite + '#arrow-to-back-mobile'}></use>
        </svg>
      </button>
    </div>
  );

  const modalCloseButton = (
    <button type="button" onClick={onClose} className={s.button}>
      <svg className={s.icon} width={12} height={12}>
        <use href={sprite + '#close-modal-cross'}></use>
      </svg>
    </button>
  );

  return createPortal(
    <div onClick={onBackdropClose} className={s.overlay}>
      <div className={s.modal}>
        {modalCloseButtonMobile}
        {modalCloseButton}
        <DailyCalorieIntake />

        <Button text="Start losing weight" width={210} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
