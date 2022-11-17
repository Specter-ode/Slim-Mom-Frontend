import s from './Logo.module.css';
import Logoimage from 'assets/png/logoMob_NotRegister.png';

const Logo = () => {
  return (
    <div>
      <img src={Logoimage} alt="logo" className={s.logo} width={44} height={47} />
      {/* <Logoimg className={s.logo} /> */}
    </div>
  );
};

export default Logo;
