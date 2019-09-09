import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import AddFoodForm from '../containers/AddFoodForm';

import SearchFoodForm from '../containers/SearchFoodForm';

import ProvideActions from '../hoc/ProvideActions';


export class BoomPage extends React.Component {

  render() {
    const {
      search,
      userInputActions,
      externalActions,
      navigateActions,
      list,
      loadingIndicator,
    } = this.props;


    return (
      <div>
        <div>Search For Food Group</div>
        <SearchFoodForm 
          search={search}
          userSetText={userInputActions.userSetText}
          searchForValue={externalActions.searchFoodGroups}
          list={list}
          loadingIndicator={loadingIndicator}
        >
          <div>{list.map(group => (
            <div key={group._id}>
              {group.description}
            </div>
          ))}</div>
        </SearchFoodForm>
      </div>
    );
  }
}

const mapStateToProps = ({ userInput: {
  search,
  protein,
  lipidTot,
  sugarTot,
  carbohydrt,
  energKcal,
  shortDesc,
  servingSize,
  alcohol,
}, data }) => {
  const { searchResults = [], loadingIndicator } = data;
  const list = searchResults.map(key => data[key]).filter(result => result);
  return {
    search,
    list,
    protein,
    lipidTot,
    sugarTot,
    carbohydrt,
    energKcal,
    shortDesc,
    servingSize,
    loadingIndicator,
    alcohol,
  };
}

const actionWrapped = ProvideActions(BoomPage);
export default connect(mapStateToProps)(actionWrapped);

