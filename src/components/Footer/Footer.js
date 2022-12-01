import { Link } from 'react-router-dom';
import s from './Footer.module.css';
import 'animate.css';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <p>
        Copyright © 2022 GoIT. Created by{' '}
        <Link className={s.link + ' animate__shakeY'} to={'/developers'}>
          Smart Team.
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
