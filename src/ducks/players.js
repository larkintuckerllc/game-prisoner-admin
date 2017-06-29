import { combineReducers } from 'redux';
import { normalize, schema } from 'normalizr';
import { createSelector } from 'reselect';
import { ACTION_PREFIX } from '../strings';

// API
// REDUCER MOUNT POINT
const reducerMountPoint = 'players';
// ACTIONS
export const ADD_PLAYER_SUCCESS = `${ACTION_PREFIX}ADD_PLAYER_SUCCESS`;
export const REMOVE_PLAYER_SUCCESS = `${ACTION_PREFIX}REMOVE_PLAYER_SUCCESS`;
export const RESET_PLAYERS = `${ACTION_PREFIX}RESET_PLAYERS`;
// SCHEMA
const playerSchema = new schema.Entity('players');
// REDUCERS
const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_PLAYER_SUCCESS:
      return {
        ...state,
        ...action.response.entities.players,
      };
    case REMOVE_PLAYER_SUCCESS: {
      const newState = { ...state };
      delete newState[action.response.result];
      return newState;
    }
    case RESET_PLAYERS:
      return {};
    default:
      return state;
  }
};
const ids = (state = [], action) => {
  switch (action.type) {
    case ADD_PLAYER_SUCCESS:
      return [...state, action.response.result];
    case RESET_PLAYERS:
      return [];
    case REMOVE_PLAYER_SUCCESS: {
      const newState = [...state];
      newState.splice(
        state.indexOf(action.response.result),
        1,
      );
      return newState;
    }
    default:
      return state;
  }
};
export default combineReducers({
  byId,
  ids,
});
// ACCESSORS AKA SELECTORS
const getPlayersIds = state => state[reducerMountPoint].ids;
const getPlayersById = state => state[reducerMountPoint].byId;
export const getPlayers = createSelector(
  [getPlayersIds, getPlayersById],
  (playersIds, playersById) => playersIds.map(id => playersById[id]),
);
// ACTION CREATOR VALIDATORS
const validPlayer = player =>
  !(player === undefined
  || player.id === undefined
  || typeof player.id !== 'string');
// ACTION CREATORS
export const addPlayer = (player) => {
  if (!validPlayer(player)) throw new Error();
  return ({
    type: ADD_PLAYER_SUCCESS,
    response: normalize(player, playerSchema),
  });
};
export const removePlayer = player => ({
  type: REMOVE_PLAYER_SUCCESS,
  response: normalize(player, playerSchema),
});
export const resetPlayers = () => ({
  type: RESET_PLAYERS,
});
