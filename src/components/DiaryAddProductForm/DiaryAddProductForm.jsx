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
  const { userDailyDiet } = useSelector(state => state.auth);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const [product, setProduct] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [clarification, setСlarification] = useState(false);

  const selectOptions = productsOptions.map(i => {
    if (userDailyDiet?.notAllowedProduct?.find(item => item.title === i.title)) {
      return {
        value: i.title,
        label: `${i.title} *`,
        color: 'rgba(251, 192, 65, 0.3)',
      };
    } else {
      return {
        value: i.title,
        label: i.title,
      };
    }
  });

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
    setСlarification(true);
  }, [product, getProductsOptions]);

  const handleSelectChange = value => {
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

  const colourStyles = {
    option: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color ? data.color : 'transparent',
      };
    },
  };

  return (
    <>
      <form className={s.form} onSubmit={handleFormSubmit}>
        {clarification && (
          <p className={s.clarification}>
            * Items on the orange background in the drop down list are not recommended for your
            diet.
          </p>
        )}
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
            onMenuClose={() => setСlarification(false)}
            // for styles
            unstyled
            classNamePrefix="react-select"
            styles={colourStyles}
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
    </>
  );
};

export default DiaryAddProductForm;
