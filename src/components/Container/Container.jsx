import s from './Container.module.css';

const Container = ({ children }) => <main className={s.container}>{children}</main>;

export default Container;
