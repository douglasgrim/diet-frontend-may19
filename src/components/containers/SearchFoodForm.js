import React from 'react';
import PropTypes from 'prop-types';
import DebouncedInput from '../simple/DebouncedInput';

const SearchFoodForm = (props) => {
  const {
    search,
    userSetText,
    searchForValue,
    debouncedTime,
    children
  } = props;
  return (
    <div className="search-food-form">
      <div>
        <DebouncedInput
          type="text"
          value={ search }
          onChange={value => userSetText({ search: value })}
          debouncedFunc={value => searchForValue(value, true)}
          debouncedTime={debouncedTime}
        />
        <button onClick={() => searchForValue(search)}>Search</button>
      </div>
      {children}
    </div>
  );
};

SearchFoodForm.propTypes = {
  search: PropTypes.string,
  userSetText: PropTypes.func,
  children: PropTypes.node,
  searchForValue: PropTypes.func,
  debouncedTime: PropTypes.number,
}

SearchFoodForm.defaultValue = {
  resultClick: () => {},
  debouncedTime: 500,
}

export default SearchFoodForm;

