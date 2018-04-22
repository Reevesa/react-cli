const menuConfig = [
  {
    icon: 'home',
    name: '首页',
    path: '/home',
    component: './pages/home',
    id: '*',
  },
  {
    noNav: true,
    name: '修改密码',
    path: '/change',
    component: './pages/changePass',
    id: '*'
  },
  { 
    icon: 'area-chart',
    name: '统计列表',
    path: '/list',
    component: './pages/list'
  },
  { 
    icon: 'cloud',
    name: '云列表',
    path: '/list1',
    component: './pages/list'
  }
];

export {
  menuConfig
};