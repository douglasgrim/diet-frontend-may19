import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ProvideId from './ProvideId';
import { v4 } from 'uuid';

import * as actions from '../../actions/userInputActions';


export class LoginPage extends React.Component {


  render() {

    const { login, pageId } = this.props;
    return (
      <div>
        <div> {login}
          <input
            value={ login }
            onChange={evt => this.props.actions.userSetText({ [`${pageId}_login`]: evt.target.value })} 
          />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired,
  fuelSavings: PropTypes.object.isRequired,
  userInput: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.userInput[`${ownProps.pageId}_login`]
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default ProvideId(connected);

