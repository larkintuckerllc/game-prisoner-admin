import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authenticated from '../ducks/authenticated';
import connected from '../ducks/connected';
import gameState from '../ducks/gameState';
import players from '../ducks/players';
import rounds from '../ducks/rounds';
import selections from '../ducks/selections';

export default combineReducers({
  authenticated,
  connected,
  form: formReducer,
  gameState,
  players,
  rounds,
  selections,
});
