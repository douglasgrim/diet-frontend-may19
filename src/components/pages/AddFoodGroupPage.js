import React from 'react';
import { connect } from 'react-redux';

import SearchFoodForm from '../containers/SearchFoodForm';
import DebouncedInput from '../simple/DebouncedInput';

import { totals, nutritionLabels } from '../../constants/nutrition';

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
}) => {
  const addGroup = () => {
    if (groupName && groupList.length > 0) {
      externalActions.addFoodGroup();
    } else {
      alert('Missing list or missing name!')
    }
  }
  return (
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
            <div key={_id}>
              <span onClick={() => userInputActions.addFoodToGroup(_id, 1)}>
                {shortDesc}
              </span>
            </div>
          ))}
        </div>
      </SearchFoodForm>
      <div className="food-group">
        <div className="totals">{Object.keys(nutritionLabels).map(nkey => (
          <div key={nkey}>{nutritionLabels[nkey]}: {totals(groupList)[nkey]}</div>
        ))}</div>
        <DebouncedInput
          value={ groupName }
          onChange={value => userInputActions.userSetText({ groupName: value })}
        />
        <div>
          {groupList.map(({ food, servings }) => (
            <div key={food._id}>
              <span onClick={() => userInputActions.removeGroupServing(food._id)}>(x)&nbsp;</span>
              {food.shortDesc}
              <DebouncedInput
                value={servings}
                onChange={value => userInputActions.editGroupServings(food._id, value)}
                validate="^[\d\.]*$"
              />
            </div>
          ))}
        </div>
        <button onClick={() => addGroup()}>ADD GROUP</button>
      </div>
    </div>
  );
}

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