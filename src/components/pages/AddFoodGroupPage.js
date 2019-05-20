import React from 'react';
import { connect } from 'react-redux';

import SearchFoodForm from '../containers/SearchFoodForm';

import ProvideActions from '../hoc/ProvideActions';

const AddFoodGroupPage = ({
  search,
  userInputActions,
  externalActions,
  navigateActions,
  list,
  loadingIndicator,
}) => (
  <div className="add-food-group-page">
    <h2>Add Group Page</h2>
    <SearchFoodForm 
      search={search}
      userSetText={userInputActions.userSetText}
      searchFood={externalActions.searchFood}
      list={list}
      loadingIndicator={loadingIndicator}
      resultClick={(foodId) => navigateActions.showDetail(foodId)}
    />
  </div>
);

const mapStateToProps = ({ data, userInput: { search }}) => {
  const { searchResults=[], loadingIndicator } = data;
  const list = searchResults.map(key => data[key]).filter(result => result);
  return {
    list,
    loadingIndicator,
    search,
  }
}

const act = ProvideActions(AddFoodGroupPage);

export default connect(mapStateToProps)(act);