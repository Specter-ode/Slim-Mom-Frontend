import instance from './auth';

export const getProductsByQuery = async query => {
  const { data } = await instance.get(`/products/${query}`);
  return data;
};

export const getDailyMeals = async date => {
  const { data } = await instance.post('/dailynutritions/getdailymeals', date);
  return data;
};

export const addMeal = async newMeal => {
  const { data } = await instance.post('/dailynutritions/addmeal', newMeal);
  return data;
};

export const deleteMeal = async mealId => {
  const { data } = await instance.delete(`/dailynutritions/${mealId}`);
  return data;
};
