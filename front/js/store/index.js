import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reducers from './reducers/index';

const history = createHistory();
const middleware = [ thunk, routerMiddleware(history) ];

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  compose(applyMiddleware(...middleware))
);

if ( process.env.NODE_ENV === 'development' && module.hot ) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers/index', () => {
    const nextReducer = require('./reducers/index').default;
  
    store.replaceReducer(nextReducer);
  });
}
  
export { history, store };