import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import game from '../../../apis/game';
import round from '../../../apis/round';
import score from '../../../apis/score';
import styles from './index.css';

const Control = ({ gameState }) => (
  <div id={styles.root}>
    {(gameState === 'JOIN' || gameState === 'SCORE') &&
      <div className="form-group">
        <button
          onClick={round}
          className="btn btn-primary"
        >Start Round</button>
      </div>
    }
    {gameState === 'DISCUSSING' &&
      <div className="form-group">
        <button
          onClick={() => {
            firebase.database().ref('gameState').set('SELECTING');
          }}
          className="btn btn-primary"
        >Selecting</button>
      </div>
    }
    {gameState === 'SELECTING' &&
      <div className="form-group">
        <button
          onClick={score}
          className="btn btn-primary"
        >Score</button>
      </div>
    }
    <div className="form-group">
      <button
        onClick={game}
        className="btn btn-primary"
      >Reset Game</button>
    </div>
  </div>
);
Control.propTypes = {
  gameState: PropTypes.string.isRequired,
};
export default Control;
