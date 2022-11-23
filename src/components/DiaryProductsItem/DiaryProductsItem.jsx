import svg from '../../assets/icons/sprite.svg';
import s from './DiaryProductsItem.module.css';

const DiaryProductsItem = ({ id }) => {
  return (
    <li className={s.item} key={id}>
      <p className={s.info}>Eggplant</p>
      <p className={s.info}>100 g</p>
      <p className={s.info}>
        320 <span className={s.small}>kcal</span>
      </p>
      <button className={s.btn} type="button" onClick={() => {}}>
        <svg className={s.icon} width="12" height="12">
          <use href={`${svg}#close-modal-cross`}></use>
        </svg>
      </button>
    </li>
  );
};

export default DiaryProductsItem;
