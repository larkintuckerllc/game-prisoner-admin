import firebase from 'firebase/app';
import { get } from '../util/rest';
import { GAME_ENDPOINT } from '../strings';

export default () => (
  firebase.auth().currentUser.getToken()
  .then(token => (get(GAME_ENDPOINT, token)))
  .catch(() => {})
);
