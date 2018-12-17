import { handleActions } from 'redux-actions';
import initialState from './initialState';

export default handleActions(
  {
    CHANGE: (state, { payload: { type, value }}) => (
      changeState(state, { [type]: value })
    ),
    RESET: (state, { payload: { type } }) => (
      changeState(state, { [type]: initialState[type] })
    )
  },
  {}
);

function changeState(state, toChange) {
  return {
    ...state,
    ...toChange
  };
}