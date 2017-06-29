import { combineReducers } from 'redux';
import { normalize, schema } from 'normalizr';
import { createSelector } from 'reselect';
import { ACTION_PREFIX } from '../strings';

// API
// REDUCER MOUNT POINT
const reducerMountPoint = 'rounds';
// ACTIONS
export const ADD_ROUND_SUCCESS = `${ACTION_PREFIX}ADD_ROUND_SUCCESS`;
export const RESET_ROUNDS = `${ACTION_PREFIX}RESET_ROUNDS`;
// SCHEMA
const roundSchema = new schema.Entity('rounds');
// REDUCERS
const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_ROUND_SUCCESS:
      return {
        ...state,
        ...action.response.entities.rounds,
      };
    case RESET_ROUNDS:
      return {};
    default:
      return state;
  }
};
const ids = (state = [], action) => {
  switch (action.type) {
    case ADD_ROUND_SUCCESS:
      return [...state, action.response.result];
    case RESET_ROUNDS:
      return [];
    default:
      return state;
  }
};
export default combineReducers({
  byId,
  ids,
});
// ACCESSORS AKA SELECTORS
const getRoundsIds = state => state[reducerMountPoint].ids;
const getRoundsById = state => state[reducerMountPoint].byId;
export const getRounds = createSelector(
  [getRoundsIds, getRoundsById],
  (roundsIds, roundsById) => roundsIds.map(id => roundsById[id]),
);
// ACTION CREATOR VALIDATORS
const validRound = round =>
  !(round === undefined
  || typeof round.id !== 'string'
  || typeof round.amount !== 'number'
  || typeof round.otherAmount !== 'number'
  || typeof round.cooperate !== 'number'
  || typeof round.not !== 'number');
// ACTION CREATORS
export const addRound = (round) => {
  if (!validRound(round)) throw new Error();
  return ({
    type: ADD_ROUND_SUCCESS,
    response: normalize(round, roundSchema),
  });
};
export const resetRounds = () => ({
  type: RESET_ROUNDS,
});
