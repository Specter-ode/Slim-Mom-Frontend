export const getModalStatus = store => store.auth.showModal;
export const getUser = store => store.auth.user;
export const getAccessToken = store => store.auth.accessToken;
export const getRefreshToken = store => store.auth.refreshToken;
export const getLoadingStatus = store => store.auth.isLoading;
export const getErrorStatus = store => store.auth.isError;
export const getLoginStatus = store => store.auth.isLogin;
