import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getKeyPair } from '../../actions/externalActions';
import { userSetText } from '../../actions/userInputActions';

const KeypairPage = ({ keypairKey, keypairPass, userSetText, getKeyPair, keypairResult }) => {
  return (
    <div>
      <div>This is the keypair page! {keypairKey}, {keypairPass}</div>
      <input
        type="text"
        value={keypairKey}
        onChange={evt => userSetText({ keypairKey: evt.target.value })}
      />
      <input
        type="password"
        value={keypairPass}
        onChange={evt => userSetText({ keypairPass: evt.target.value })}
      />
      <button onClick={() => getKeyPair(keypairKey, keypairPass)}>Send it!</button>
      <div>{keypairResult}</div>
    </div>
  );
};

const mapStateToProps = ({
  userInput: {
    keypairKey,
    keypairPass,
  },
  data: {
    keypairResult,
  }
}) => ({
  keypairKey,
  keypairPass,
  keypairResult,
});

const mapDispatchToProps = dispatch => ({
  getKeyPair: (...args) => dispatch(getKeyPair(...args)),
  userSetText: (...args) => dispatch(userSetText(...args))
});

KeypairPage.propTypes = {
  keypairKey: PropTypes.string,
  keypairPass: PropTypes.string,
  userSetText: PropTypes.func,
  getKeyPair: PropTypes.func,
  keypairResult: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(KeypairPage);