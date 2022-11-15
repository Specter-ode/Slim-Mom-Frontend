import error404 from '../../assets/img/error404.jpg';
import s from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main role="alert" className={s.main}>
      <img src={error404} width="650" alt="Error 404" className={s.img} />
      <Link className={s.link} to="/">
        Go to home page
      </Link>
    </main>
  );
}
