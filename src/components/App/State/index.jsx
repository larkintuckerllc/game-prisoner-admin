import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

const State = ({ gameState }) => (
  <div id={styles.root}>{gameState}</div>
);
State.propTypes = {
  gameState: PropTypes.string.isRequired,
};
export default State;
