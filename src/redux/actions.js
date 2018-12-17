import { createActions } from 'redux-actions';

export default createActions({
  CHANGE: (type, value) => ({ type, value }),
  RESET: (type) => ({ type })
});