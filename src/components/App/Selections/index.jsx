import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

const Selections = ({ selections }) => (
  <div id={styles.root}>
    <div>
      {selections.map(o => (
        <div
          key={o.id}
          className={styles.rootItemsItem}
        >
          <span
            className={`glyphicon ${o.value ? 'glyphicon-thumbs-up' : 'glyphicon-thumbs-down'}`}
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
    <div>
      ( {selections.length.toString()} )
    </div>
  </div>
);
Selections.propTypes = {
  // eslint-disable-next-line
  selections: PropTypes.array.isRequired,
};
export default Selections;
