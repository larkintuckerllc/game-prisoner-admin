import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

const Rounds = ({ rounds }) => (
  <div id={styles.root}>
    <table>
      <thead>
        <tr>
          <td>self</td>
          <td>other</td>
          <td><span className="glyphicon glyphicon-thumbs-up" /></td>
          <td><span className="glyphicon glyphicon-thumbs-down" /></td>
        </tr>
      </thead>
      <tbody>
        {rounds.map(o => (
          <tr
            key={o.id}
          >
            <td>{o.amount.toString()}</td>
            <td>{o.otherAmount.toString()}</td>
            <td>{o.cooperate.toString()}</td>
            <td>{o.not.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
Rounds.propTypes = {
  // eslint-disable-next-line
  rounds: PropTypes.array.isRequired,
};
export default Rounds;
