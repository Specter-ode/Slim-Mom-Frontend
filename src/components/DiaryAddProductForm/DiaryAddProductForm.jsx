import s from './DiaryAddProductForm.module.css';

const DiaryAddProductForm = () => {
  return (
    <form className={s.form}>
      <button type="submit" className={s.btn}>
        + Add product +
      </button>
    </form>
  );
};

export default DiaryAddProductForm;
