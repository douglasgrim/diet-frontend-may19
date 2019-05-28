import React from 'react';
import { connect } from 'react-redux';

import SearchFoodForm from '../containers/SearchFoodForm';
import DebouncedInput from '../simple/DebouncedInput';

import { totals } from '../../constants/nutrition';

import ProvideActions from '../hoc/ProvideActions';

const AddFoodGroupPage = ({
  search,
  userInputActions,
  externalActions,
  navigateActions,
  list,
  loadingIndicator,
  groupList,
  groupName,
  userOnly,
}) => (
  <div className="add-food-group-page">
    <h2>Add Group Page</h2>
    <SearchFoodForm 
      search={search}
      userSetText={userInputActions.userSetText}
      searchForValue={externalActions.searchFood}
      list={list}
      loadingIndicator={loadingIndicator}
      resultClick={(foodId) => userInputActions.addFoodToGroup(foodId, 1)}
      userOnly={true}
    >
      <div>
        {list.map(({ shortDesc, _id }) => (
          <div key={_id} onClick={() => userInputActions.addFoodToGroup(_id, 1)}>
            {shortDesc}
          </div>
        ))}
      </div>
    </SearchFoodForm>
    <div>
      <DebouncedInput
        value={ groupName }
        onChange={value => userInputActions.userSetText({ groupName: value })}
      />
      <div>
        {groupList.map(({ food, servings }) => (
          <div key={food._id}>
            {food.shortDesc}
            <DebouncedInput
              value={servings}
              onChange={value => userInputActions.editGroupServings(food._id, value)}
              validate="^[\d\.]*$"
            />
          </div>
        ))}
      </div>
      <div>{JSON.stringify(totals(groupList))}</div>
      <button onClick={() => externalActions.addFoodGroup()}>ADD GROUP</button>
    </div>
  </div>
);

const mapStateToProps = ({
  data,
  userInput: { search, groupContents=[], groupName, userOnly },
}) => {
  const { searchResults=[], loadingIndicator } = data;
  const list = searchResults.map(key => data[key]).filter(result => result);
  const groupList = groupContents.map(({ foodId, servings }) => ({ food: data[foodId], servings}));
  return {
    list,
    loadingIndicator,
    search,
    groupContents,
    groupName,
    userOnly,
    groupList,
  }
}

AddFoodGroupPage.defaultValue = {
  groupContents: [],
};

const act = ProvideActions(AddFoodGroupPage);
export default connect(mapStateToProps)(act);