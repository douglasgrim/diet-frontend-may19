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
      <div>{ list.map(food => (
        <div key={food._id} onClick={() => resultClick(food._id)}>
          {food.shortDesc}
        </div>
      )) }
        { loadingIndicator && <LoadingIndicator /> }
      </div>
    </div>
  );
};

SearchFoodForm.propTypes = {
  resultClick: () => {},
}

export default SearchFoodForm;

