import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

const Players = ({ players }) => (
  <div id={styles.root}>
    <div>
      {players.map(o => (
        <div
          key={o.id}
          className={styles.rootItemsItem}
        >
          <span
            className="glyphicon glyphicon-user"
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
    <div>
      ( {players.length.toString()} )
    </div>
  </div>
);
Players.propTypes = {
  // eslint-disable-next-line
  players: PropTypes.array.isRequired,
};
export default Players;
