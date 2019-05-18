import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

const ProvideId = (WrappedComponent) => {
  class ProviderClass extends React.Component { // eslint-disable-line
    constructor() {
      super();
      this.pageId = v4();
    }
    render() {
      return <WrappedComponent pageId={this.props.pageId || this.pageId} {...this.props} />;
    }
  }
  ProviderClass.propTypes = {
    pageId: PropTypes.string,
  }
  return ProviderClass;
}

export default ProvideId;