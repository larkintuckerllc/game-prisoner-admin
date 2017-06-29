import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { FIREBASE_CONFIG, FIREBASE_EMAIL, RUNNING } from '../../strings';
import { ServerException } from '../../util/exceptions';
import * as fromAuthenticated from '../../ducks/authenticated';
import * as fromConnected from '../../ducks/connected';
import * as fromGameState from '../../ducks/gameState';
import * as fromPlayers from '../../ducks/players';
import * as fromSelections from '../../ducks/selections';
import Connecting from './Connecting';
import Alert from './Alert';
import Control from './Control';
import Login from './Login';
import Players from './Players';
import Selections from './Selections';
import State from './State';

const handleLogin = password => (
  firebase.auth().signInWithEmailAndPassword(
    FIREBASE_EMAIL,
    password,
  ).catch((error) => {
    if (error.code === 'auth/wrong-password') {
      throw new ServerException('401');
    }
    throw new ServerException('500');
  })
);
class App extends Component {
  constructor(props) {
    super(props);
    this.handleGameState = this.handleGameState.bind(this);
    this.handlePlayerAdded = this.handlePlayerAdded.bind(this);
    this.handlePlayerRemoved = this.handlePlayerRemoved.bind(this);
    this.handleSelectionAdded = this.handleSelectionAdded.bind(this);
  }
  componentDidMount() {
    const {
      setAuthenticated,
      setConnected,
    } = this.props;
    firebase.initializeApp(FIREBASE_CONFIG);
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        setAuthenticated(true);
        // PRESENCE
        const connectedRef = firebase.database().ref('.info/connected');
        connectedRef.on('value', (snap) => {
          if (snap.val() === true) {
            setConnected(true);
          } else {
            setConnected(false);
          }
        });
        // STATE
        firebase.database().ref('gameState').on('value', this.handleGameState);
        // PLAYERS
        firebase.database().ref('joined').on('child_added', this.handlePlayerAdded);
        firebase.database().ref('joined').on('child_removed', this.handlePlayerRemoved);
        // SELECTIONS
        firebase.database().ref('selection').on('child_added', this.handleSelectionAdded);
      }
    });
    firebase.auth().signOut();
  }
  handleGameState(snap) {
    const { resetSelections, setGameState } = this.props;
    const gameState = snap.val();
    switch (gameState) {
      case 'JOIN':
        resetSelections();
        break;
      case 'DISCUSSING':
        resetSelections();
        break;
      default:
    }
    setGameState(gameState);
  }
  handlePlayerAdded(snap) {
    const { addPlayer } = this.props;
    const playerKey = snap.getKey();
    addPlayer({
      id: playerKey,
    });
  }
  handlePlayerRemoved(snap) {
    const { removePlayer } = this.props;
    const playerKey = snap.getKey();
    removePlayer({
      id: playerKey,
    });
  }
  handleSelectionAdded(snap) {
    const { addSelection } = this.props;
    const selectionKey = snap.getKey();
    const value = snap.val();
    addSelection({
      id: selectionKey,
      value,
    });
  }
  render() {
    const {
      authenticated,
      connected,
      gameState,
      players,
      selections,
    } = this.props;
    if (RUNNING) return <Alert message="running in another window" />;
    if (!authenticated) return <Login onLogin={handleLogin} />;
    if (!connected || gameState === null) return <Connecting />;
    return (
      <div>
        <State gameState={gameState} />
        <Players players={players} />
        {gameState === 'SELECTING' &&
          <Selections selections={selections} />
        }
        <Control gameState={gameState} />
      </div>
    );
  }
}
App.propTypes = {
  addPlayer: PropTypes.func.isRequired,
  addSelection: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  connected: PropTypes.bool.isRequired,
  gameState: PropTypes.string,
  removePlayer: PropTypes.func.isRequired,
  // eslint-disable-next-line
  players: PropTypes.array.isRequired,
  // eslint-disable-next-line
  resetSelections: PropTypes.func.isRequired,
  selections: PropTypes.array.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
  setConnected: PropTypes.func.isRequired,
  setGameState: PropTypes.func.isRequired,
};
App.defaultProps = {
  gameState: null,
};
export default connect(
  state => ({
    authenticated: fromAuthenticated.getAuthenticated(state),
    connected: fromConnected.getConnected(state),
    gameState: fromGameState.getGameState(state),
    players: fromPlayers.getPlayers(state),
    selections: fromSelections.getSelections(state),
  }),
  {
    addPlayer: fromPlayers.addPlayer,
    addSelection: fromSelections.addSelection,
    removePlayer: fromPlayers.removePlayer,
    resetSelections: fromSelections.resetSelections,
    setAuthenticated: fromAuthenticated.setAuthenticated,
    setConnected: fromConnected.setConnected,
    setGameState: fromGameState.setGameState,
  },
)(App);
