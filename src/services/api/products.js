import instance from './auth';

export const getDailyNormAndNotRecommendedList = async () => {
  const { data } = await instance.get('/dailynorm');
  return data;
};

export const getProductByQuery = async query => {
  const { data } = await instance.get(`/products/${query}`);
  return data;
};

export const addNewProduct = async newData => {
  const { data } = await instance.post('/products', newData);
  return data;
};

export const updateProduct = async (id, newData) => {
  const { data } = await instance.patch(`/products/${id}`, newData);
  return data;
};
