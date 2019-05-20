import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as userInputActions from '../../actions/userInputActions';
import * as externalActions from '../../actions/externalActions';
import * as navigateActions from '../../actions/navigateActions';
import * as dataActions from '../../actions/dataActions';


const ProvideActions = (WrappedComponent) => {
  class ProviderClass extends React.Component { // eslint-disable-line
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  ProviderClass.propTypes = {
    pageId: PropTypes.string,
  }

  const mapStateToProps = () => ({});

  const mapDispatchToProps = (dispatch) => ({
    userInputActions: bindActionCreators(userInputActions, dispatch),
    externalActions: bindActionCreators(externalActions, dispatch),
    navigateActions: bindActionCreators(navigateActions, dispatch),
    dataActions: bindActionCreators(dataActions, dispatch),
  })

  return connect(mapStateToProps, mapDispatchToProps)(ProviderClass);
}

export default ProvideActions;