import firebase from 'firebase/app';
import { get } from '../util/rest';
import { ROUND_ENDPOINT } from '../strings';

export default () => (
  firebase.auth().currentUser.getToken()
  .then(token => (get(ROUND_ENDPOINT, token)))
  .catch(() => {})
);
