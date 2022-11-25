import s from './TestSelect.module.css';
import selectStyles from './selectStyles';
import { Button, ButtonPlus } from 'components';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getProductByQuery } from 'services/api/products';
import { addNewProduct } from 'redux/products/products-operations';
import { useDispatch } from 'react-redux';
import useWindowDimensions from 'services/hooks/useWindowDimensions';

// const userData = {
//   bloodtype: 2,
//   name: 'Vlad',
// };

const TestSelect = ({ date = '2022/11/25' }) => {
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const [grams, setGrams] = useState('');
  console.log('grams: ', grams);
  const [selectedMeal, setSelectedMeal] = useState('');
  console.log('selectedMeal: ', selectedMeal);
  const [options, setOptions] = useState([{ label: 'no info' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [selectClassName, setSelectClassName] = useState('');

  const dispatch = useDispatch();
  useEffect(
    () => {
      if (query) {
        const fetchByQuery = async () => {
          setLoading(true);
          setError(null);
          try {
            const res = await getProductByQuery(query);
            const newOptions = res?.map(product => ({
              value: product.title,
              label: product.title,
              grams,
            }));
            setOptions(newOptions);
            setLoading(false);
          } catch (error) {
            setError(error);
          }
        };
        fetchByQuery();
        // console.log('newOptions: ', newOptions);
        // const bloodtypeIndex = userData['bloodtype'];
        // console.log('bloodtypeIndex: ', bloodtypeIndex);
        // newOptions.length > 0 && newOptions.groupBloodNotAllowed[bloodtypeIndex]
        //   ? setSelectClassName(s.notRecommend)
        //   : setSelectClassName(s.recommend);
      }
      // console.log('selectClassName: ', selectClassName);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );
  const handleChange = newValue => {
    setSelectedMeal(newValue);
  };
  const handleGrams = e => {
    setGrams(e.target.value);
    setSelectedMeal(prevState => ({
      ...prevState,
      grams: e.target.value,
    }));
  };
  const addNewMeal = e => {
    e.preventDefault();
    const newProduct = {
      date,
      product: selectedMeal.label,
      grams: selectedMeal.grams,
    };

    dispatch(addNewProduct(newProduct));
    setQuery('');
    setGrams('');
    setSelectedMeal('');
    setOptions([]);
  };
  return (
    <form className={s.form} onSubmit={addNewMeal}>
      <Select
        // className='react-select-container'
        // classNamePrefix="select"
        onChange={handleChange}
        value={selectedMeal}
        options={options}
        inputValue={query}
        onInputChange={setQuery}
        isLoading={loading}
        isClearable={true}
        styles={selectStyles}
        placeholder={'Enter product name'}
        required
      />
      <label className={s.label}>
        <input
          className={s.input}
          type="number"
          onChange={handleGrams}
          value={grams}
          name="grams"
          min="10"
          autoComplete="off"
          required
          placeholder="Grams"
        />
      </label>

      {width < 768 && <Button text="Add" width={176} />}
      {width > 767 && <ButtonPlus />}
    </form>
  );
};

export default TestSelect;
