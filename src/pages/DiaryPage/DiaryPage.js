import s from './DiaryPage.module.css';
import SideBar from 'components/SideBar/SideBar';
import DiaryAddProductForm from 'components/DiaryAddProductForm/DiaryAddProductForm';
import DiaryDateСalendar from 'components/DiaryDateСalendar/DiaryDateСalendar';
import DiaryProductsList from 'components/DiaryProductsList/DiaryProductsList';

const DiaryPage = () => {
  return (
    <main>
      <h3 className={s.title}>DiaryPage </h3>
      <DiaryDateСalendar />
      <DiaryAddProductForm />
      <DiaryProductsList />
      <SideBar />
    </main>
  );
};

export default DiaryPage;
