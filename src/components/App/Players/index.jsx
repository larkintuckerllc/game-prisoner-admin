import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

const Players = ({ players }) => (
  <div id={styles.root}>
    {players.map(o => (
      <span
        key={o.id}
        className="glyphicon glyphicon-user"
        aria-hidden="true"
      />
    ))}
  </div>
);
Players.propTypes = {
  // eslint-disable-next-line
  players: PropTypes.array.isRequired,
};
export default Players;
