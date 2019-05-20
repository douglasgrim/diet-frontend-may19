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
  groupContents,
}) => (
  <div className="add-food-group-page">
    <h2>Add Group Page</h2>
    <SearchFoodForm 
      search={search}
      userSetText={userInputActions.userSetText}
      searchFood={externalActions.searchFood}
      list={list}
      loadingIndicator={loadingIndicator}
      resultClick={(foodId) => userInputActions.addFoodToGroup(foodId, 1)}
    />
    <div>{JSON.stringify(groupContents)}</div>
  </div>
);

const mapStateToProps = ({ data, userInput: { search, groupContents }}) => {
  const { searchResults=[], loadingIndicator } = data;
  const list = searchResults.map(key => data[key]).filter(result => result);
  return {
    list,
    loadingIndicator,
    search,
    groupContents,
  }
}

const act = ProvideActions(AddFoodGroupPage);

export default connect(mapStateToProps)(act);