import React from 'react';
import LoadingIndicator from '../simple/LoadingIndicator';
import DebouncedInput from '../simple/DebouncedInput';

const SearchFoodForm = (props) => {
  const {
    search,
    userSetText,
    searchFood,
    list,
    loadingIndicator,
    resultClick,
    children
  } = props;
  return (
    <div className="search-food-form">
      <div>
        <DebouncedInput
          type="text"
          value={ search }
          onChange={value => userSetText({ search: value })}
          debouncedFunc={value => searchFood(value)}
          debouncedTime={500}
        />
        <button onClick={() => searchFood(search)}>Search</button>
      </div>
      {children}
    </div>
  );
};

SearchFoodForm.propTypes = {
  resultClick: () => {},
}

export default SearchFoodForm;

