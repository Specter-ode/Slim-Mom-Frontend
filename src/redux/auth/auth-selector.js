export const isLogin = store => {
  console.log('store: ', store);

  return store.auth.isLogin;
};
