import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ProvideId from './ProvideId';

import * as userInputActions from '../../actions/userInputActions';
import * as externalActions from '../../actions/externalActions';
import * as dataActions from '../../actions/dataActions';


export class LoginPage extends React.Component {


  render() {

    const { email, password, userInputActions, externalActions, loggedIn, error } = this.props;
    return (
      <div>
        <div>{loggedIn ? 'YOU LOGGED' : 'out'}</div>
        <div>
          Username:
          <input
            type="email"
            value={ email }
            onChange={evt => userInputActions.userSetText({ email: evt.target.value })} 
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={ password }
            onChange={evt => userInputActions.userSetText({ password: evt.target.value })}
          />
        </div>
        <div><button onClick={() => externalActions.login(email, password)}>Submit</button></div>
        {error && <div>{error}</div>}
      </div>
    );
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired,
  pageId: PropTypes.string,
  login: PropTypes.string,
  password: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    email: state.userInput.email,
    password: state.userInput.password,
    loggedIn: state.data.loggedIn,
    error: state.data.error,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    userInputActions: bindActionCreators(userInputActions, dispatch),
    externalActions: bindActionCreators(externalActions, dispatch),
    dataActions: bindActionCreators(dataActions, dispatch),
  };
}


const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default ProvideId(connected);

