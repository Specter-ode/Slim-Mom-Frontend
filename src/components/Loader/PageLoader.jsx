import s from './PageLoader.module.css';

const PageLoader = () => {
  return (
    <div className={s.circle}>
      LOADING
      <span className={s.dote}></span>
    </div>
  );
};

export default PageLoader;
