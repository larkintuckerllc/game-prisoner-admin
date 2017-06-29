import { combineReducers } from 'redux';
import { normalize, schema } from 'normalizr';
import { createSelector } from 'reselect';
import { ACTION_PREFIX } from '../strings';

// API
// REDUCER MOUNT POINT
const reducerMountPoint = 'selections';
// ACTIONS
export const ADD_SELECTION_SUCCESS = `${ACTION_PREFIX}ADD_SELECTION_SUCCESS`;
export const RESET_SELECTIONS = `${ACTION_PREFIX}RESET_SELECTIONS`;
// SCHEMA
const selectionSchema = new schema.Entity('selections');
// REDUCERS
const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_SELECTION_SUCCESS:
      return {
        ...state,
        ...action.response.entities.selections,
      };
    case RESET_SELECTIONS:
      return {};
    default:
      return state;
  }
};
const ids = (state = [], action) => {
  switch (action.type) {
    case ADD_SELECTION_SUCCESS:
      return [...state, action.response.result];
    case RESET_SELECTIONS:
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
const getSelectionsIds = state => state[reducerMountPoint].ids;
const getSelectionsById = state => state[reducerMountPoint].byId;
export const getSelections = createSelector(
  [getSelectionsIds, getSelectionsById],
  (selectionsIds, selectionsById) => selectionsIds.map(id => selectionsById[id]),
);
// ACTION CREATOR VALIDATORS
const validSelection = selection =>
  !(selection === undefined
  || typeof selection.id !== 'string'
  || typeof selection.value !== 'boolean');
// ACTION CREATORS
export const addSelection = (selection) => {
  if (!validSelection(selection)) throw new Error();
  return ({
    type: ADD_SELECTION_SUCCESS,
    response: normalize(selection, selectionSchema),
  });
};
export const resetSelections = () => ({
  type: RESET_SELECTIONS,
});
