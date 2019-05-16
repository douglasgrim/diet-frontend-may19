import React from 'react';
import { v4 } from 'uuid';

const ProvideId = (WrappedComponent) => {
  return class extends React.Component { // eslint-disable-line
    constructor() {
      super();
      this.pageId = v4();
    }
    render() {
      return <WrappedComponent pageId={this.props.pageId || this.pageId} {...this.props} />;
    }
  }
}

export default ProvideId;