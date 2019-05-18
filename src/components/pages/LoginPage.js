import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as userInputActions from '../../actions/userInputActions';
import * as externalActions from '../../actions/externalActions';

import LoadingIndicator from '../simple/LoadingIndicator';
import DebouncedInput from '../simple/DebouncedInput';
import ProvideId from '../hoc/ProvideId';

export class LoginPage extends React.Component {


  render() {

    const {
      email,
      password,
      userInputActions,
      externalActions,
      error,
      loadingIndicator,
      pageId,
    } = this.props;
    return (
      <div className="login-page">
        <div>PageId: {pageId} </div>
        <div>
          Username:
          <DebouncedInput
            type="email"
            value={ email }
            onChange={value => userInputActions.userSetText({ email: value })}
            onEnter={() => externalActions.login(email, password)}
          />
        </div>
        <div>
          Password:
          <DebouncedInput
            type="password"
            value={ password }
            onChange={value => userInputActions.userSetText({ password: value })}
            onEnter={() => externalActions.login(email, password)}
          />
        </div>
        <div><button onClick={() => externalActions.login(email, password)}>Submit</button></div>
        { loadingIndicator && <div><LoadingIndicator /></div> }
        {error && <div>{error}</div>}
      </div>
    );
  }
}

LoginPage.propTypes = {
  pageId: PropTypes.string,
  login: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  userInputActions: PropTypes.object,
  externalActions: PropTypes.object,
  error: PropTypes.string,
  loadingIndicator: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    email: state.userInput.email,
    password: state.userInput.password,
    loggedIn: state.data.loggedIn,
    error: state.data.error,
    loadingIndicator: state.data.loadingIndicator,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    userInputActions: bindActionCreators(userInputActions, dispatch),
    externalActions: bindActionCreators(externalActions, dispatch),
  };
}


const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default ProvideId(connected);

