
// 同步 action
const getList = (params) => ({
  type: 'GET_LIST',
  data: params
});

const deleteList = (params) => ({
  type: 'DELETE_LIST',
  data: params
});


export {
  getList,
  deleteList
};