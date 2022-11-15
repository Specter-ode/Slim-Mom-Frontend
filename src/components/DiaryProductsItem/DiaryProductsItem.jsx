import s from './DiaryProductsItem.module.css';
const DiaryProductsItem = ({ id }) => {
  return (
    <li className={s.item} key={id}>
      <p className={s.info}>Наименование продукта</p>
      <p className={s.info}>Количество грамм</p>
      <p className={s.info}>Количество каллорий</p>
      <button className={s.btn} type="button" onClick={() => {}}>
        Delete
      </button>
    </li>
  );
};

export default DiaryProductsItem;
