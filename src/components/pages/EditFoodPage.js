import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import AddFoodForm from '../containers/AddFoodForm';
import LoadingIndicator from '../simple/LoadingIndicator';

import SearchFoodForm from '../containers/SearchFoodForm';

import ProvideActions from '../hoc/ProvideActions';


export class EditFoodPage extends React.Component {

  render() {
    const {
      search,
      userInputActions,
      externalActions,
      navigateActions,
      list,
      loadingIndicator,
      protein,
      lipidTot,
      sugarTot,
      carbohydrt,
      energKcal,
      shortDesc,
      servingSize,
      alcohol,
      match: { params: { foodId } },
    } = this.props;

    const editFood = () => {
      externalActions.editFood({
        protein: Number(protein) || 0,
        shortDesc,
        lipidTot: Number(lipidTot) || 0,
        carbohydrt: Number(carbohydrt) || 0,
        servingSize: Number(servingSize) || 0,
        sugarTot: Number(sugarTot) || 0,
        energKcal: Number(energKcal) || 0,
        foodId,
      });
    }

    return (
      <div>
        <div>EDIT THE FOOD!</div>
        <AddFoodForm
          {...this.props}
          processFood={editFood}
          buttonText="EDIT"
        />
        {loadingIndicator && <LoadingIndicator />}
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

const actionWrapped = ProvideActions(EditFoodPage);
export default connect(mapStateToProps)(actionWrapped);

