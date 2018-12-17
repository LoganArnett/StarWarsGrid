import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import initialState from './initialState';
import reducers from './reducers';

const isProduction = process.env.NODE_ENV === 'production';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function createStore(initial = initialState) {
  return _createStore(reducers, initial, !isProduction ? composeEnhancers(applyMiddleware(promise)) : applyMiddleware(promise));
}

export { default as actions } from './actions';