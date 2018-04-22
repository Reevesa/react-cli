
const initUserInfo = (params) => ({
  type: 'USER_LOGIN_STATUS',
  data: params
});

const changePassword = (params) => ({
  type: 'USER_CHANGE_PASSWORD',
  data: params
});

const login = (params) => {
  return async (dispatch, getState) => {
    let res = await new Promise((resolve, reject) => {
      setTimeout(() => { resolve(true); }, 2000);
    });

    if (res) {
      console.log('params', params);
      dispatch({
        type: 'USER_LOGIN_STATUS',
        data: { isLogin: true, ...params }
      });
    }
  };
};

export {
  initUserInfo,
  changePassword,
  login
};

