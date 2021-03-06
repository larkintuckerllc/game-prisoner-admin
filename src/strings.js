// RUNNING
export const RUNNING = window.localStorage.getItem('gamePrisonerRunning') !== null;
if (!RUNNING) {
  window.localStorage.setItem('gamePrisonerRunning', true);
  window.addEventListener('unload', () => {
    window.localStorage.removeItem('gamePrisonerRunning');
  });
}
// REST OF THEM
export const ACTION_PREFIX = 'app/';
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyD0xUucxtbfOc_0lp_w4nv69LIle2HTnNU',
  authDomain: 'game-prisoner.firebaseapp.com',
  databaseURL: 'https://game-prisoner.firebaseio.com',
  projectId: 'game-prisoner',
  storageBucket: 'game-prisoner.appspot.com',
  messagingSenderId: '416710348817',
};
export const FIREBASE_EMAIL = 'admin@game.prisoner';
export const ROUND_ENDPOINT = 'https://us-central1-game-prisoner.cloudfunctions.net/app/round';
export const SCORE_ENDPOINT = 'https://us-central1-game-prisoner.cloudfunctions.net/app/score';
export const GAME_ENDPOINT = 'https://us-central1-game-prisoner.cloudfunctions.net/app/game';
