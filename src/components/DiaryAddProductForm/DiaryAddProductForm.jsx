import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import debounce from 'lodash.debounce';

import { getProductsByQuery, addMeal } from '../../redux/products/products-operations';
import useWindowDimensions from '../../services/hooks/useWindowDimensions';
import { Button, ButtonPlus } from 'components';
import s from './DiaryAddProductForm.module.css';

const DiaryAddProductForm = () => {
  const { productsOptions, date } = useSelector(state => state.products);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const [product, setProduct] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const selectOptions = productsOptions.map(i => ({ value: i.title, label: i.title }));

  const getProductsOptions = useMemo(
    () =>
      debounce(value => {
        dispatch(getProductsByQuery(value));
      }, 400),
    [dispatch]
  );

  useEffect(() => {
    if (!product) return;
    getProductsOptions(product);
  }, [product, getProductsOptions]);

  const handleSelectChange = value => {
    console.log(value);
    setProduct(value);
  };

  const handleInputChange = e => {
    setWeight(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    const newMeal = {
      date,
      product: selectedOption.value,
      grams: weight,
    };

    dispatch(addMeal(newMeal));

    setProduct('');
    setWeight('');
    setSelectedOption(null);
  };

  return (
    <form className={s.form} onSubmit={handleFormSubmit}>
      <label className={s.label}>
        <Select
          // common
          name="product"
          required
          placeholder="Enter product name"
          // for input
          isSearchable={true}
          inputValue={product}
          onInputChange={handleSelectChange}
          // for select
          defaultValue={selectedOption}
          value={selectedOption}
          onChange={setSelectedOption}
          // for menu (list of options)
          options={selectOptions}
          menuIsOpen={product.length > 0}
          // for styles
          unstyled
          classNamePrefix="react-select"
        />
      </label>
      <label className={s.label}>
        <input
          type="number"
          name="weight"
          value={weight}
          min="0"
          max="3000"
          required
          placeholder="Grams"
          className={s.input}
          onChange={handleInputChange}
        />
      </label>

      {width < 768 && <Button text="Add" width={176} />}

      {width > 767 && <ButtonPlus />}
    </form>
  );
};

export default DiaryAddProductForm;
