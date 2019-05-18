import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

class DebouncedInput extends React.Component {
  constructor({ debouncedFunc, debouncedTime }) {
    super();
    this.debounced = debounce(value => debouncedFunc(value), debouncedTime);
  }
  _onChange(evt) {
    const { onChange, validate } = this.props;
    const regex = new RegExp(validate);
    const { value } = evt.target;
    if(regex.test(value)) {
      onChange(value, evt);
      this.debounced(value, evt);      
    }
  }
  render() {
    const { value, onEnter, type } = this.props;
    return <input
      type={type}
      value={value}
      onChange={evt => this._onChange(evt)}
      onKeyDown={evt => evt.keyCode === 13 ? onEnter() : null}
    />;
  }
}

DebouncedInput.propTypes = {
  debouncedFunc: PropTypes.func,
  debouncedTime: PropTypes.number,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  value: PropTypes.string,
  validate: PropTypes.string,
  type: PropTypes.string,
}

DebouncedInput.defaultProps = {
  debouncedFunc: () => {},
  debouncedTime: 0,
  onChange: () => {},
  onEnter: () => {},
  value: '',
  validate: '.*',
  type: 'text',
};

export default DebouncedInput;