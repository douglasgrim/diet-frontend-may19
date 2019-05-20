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
        <div>Search</div>
        <div onClick={() => navigateActions.addFoodGroup()}>Add Food Group</div>
        <SearchFoodForm 
          search={search}
          userSetText={userInputActions.userSetText}
          searchFood={externalActions.searchFood}
          list={list}
          loadingIndicator={loadingIndicator}
          resultClick={(foodId) => navigateActions.showDetail(foodId)}
        />
        <AddFoodForm {...this.props} />
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
  };
}

const actionWrapped = ProvideActions(BoomPage);
export default connect(mapStateToProps)(actionWrapped);

