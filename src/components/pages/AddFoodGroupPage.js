import React from 'react';
import { connect } from 'react-redux';

import SearchFoodForm from '../containers/SearchFoodForm';

import DebouncedInput from '../simple/DebouncedInput';

import ProvideActions from '../hoc/ProvideActions';

const AddFoodGroupPage = ({
  search,
  userInputActions,
  externalActions,
  navigateActions,
  list,
  loadingIndicator,
  groupContents,
  groupName,
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
    >
      <div>
        {list.map(({ shortDesc, _id }) => (
          <div key={_id} onClick={() => userInputActions.addFoodToGroup(_id, 1)}>
            {shortDesc}
          </div>
        ))}
      </div>
    </SearchFoodForm>
    <div>{JSON.stringify(groupContents)}
      <DebouncedInput
        type="text"
        value={ groupName }
        onChange={value => userInputActions.userSetText({ groupName: value })}
      />
      <button onClick={() => externalActions.addFoodGroup()}>ADD GROUP</button>
    </div>
  </div>
);

const mapStateToProps = ({ data, userInput: { search, groupContents, groupName }}) => {
  const { searchResults=[], loadingIndicator } = data;
  const list = searchResults.map(key => data[key]).filter(result => result);
  return {
    list,
    loadingIndicator,
    search,
    groupContents,
    groupName,
  }
}

const act = ProvideActions(AddFoodGroupPage);
export default connect(mapStateToProps)(act);