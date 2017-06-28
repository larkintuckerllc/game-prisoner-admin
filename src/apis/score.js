import firebase from 'firebase/app';
import { get } from '../util/rest';
import { SCORE_ENDPOINT } from '../strings';

export default () => (
  firebase.auth().currentUser.getToken()
  .then(token => (get(SCORE_ENDPOINT, token)))
  .catch(() => {})
);
