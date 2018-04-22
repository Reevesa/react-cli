import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import LazyRoute from 'lazy-route';
import { menuConfig } from './routes';
import Container from './container';
import Home from './pages/home';
import { store, history } from './store';
import storage from '@/utils/storage';

const routes = formatRoutes(menuConfig);

function formatRoutes( routes = [] ) {
  let arr = [];
  recurRoutes(routes, arr);
  return arr;
}

function recurRoutes(routesArr, arr) {
  routesArr.map(route => {
    if (route.childRoutes && route.childRoutes.length) {
      if (route.component) {
        arr.push(route);
      }
      recurRoutes(route.childRoutes, arr);
    } else {
      arr.push(route);
    }
  });
}

// 定义路由组件
const RouteWithSubRoutes = ( route ) => (
  <Route path={route.path} exact={true} render={( props ) => {
    return <LazyRoute {...props} component={import(`${route.component}`)} />;
  }}
  />
);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" render={(props) => {
          let unknowRoute = true; // 出现的 路由 不在路由配置中, 显示 Home 页
          // TODO: 这里 可以加上 是否登录的 判断, 暂时 用 localStroage 判断, 后期替换cookie->jwt
          let isLogin = storage.getLocal('userInfo').isLogin;
          return isLogin ? ( <Container {...props} formatRoutes={routes}>
            {routes.map((route, i) => {
              if (route.path === props.location.pathname) {
                unknowRoute = false;
              }
              return <RouteWithSubRoutes key={i} {...route} />;
            })}
            {
              unknowRoute ? <Route component={Home} /> : null
            }
          </Container>) : <LazyRoute {...props} component={import('./pages/login')} />;
        }} ></Route>
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;