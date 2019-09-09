import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import AddFoodForm from '../containers/AddFoodForm';

import SearchFoodForm from '../containers/SearchFoodForm';

import ProvideActions from '../hoc/ProvideActions';


export class AddFoodPage extends React.Component {

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
    } = this.props;

      const addFood = () => {
        externalActions.addFood({
          protein: Number(protein) || 0,
          shortDesc,
          lipidTot: Number(lipidTot) || 0,
          carbohydrt: Number(carbohydrt) || 0,
          servingSize: Number(servingSize) || 0,
          sugarTot: Number(sugarTot) || 0,
          energKcal: Number(energKcal) || 0,
          alcohol: Number(alcohol) || 0,
        });
      }

    return (
      <div>
        <SearchFoodForm 
          search={search}
          userSetText={userInputActions.userSetText}
          searchForValue={externalActions.searchFood}
          list={list}
          loadingIndicator={loadingIndicator}
          resultClick={(foodId) => navigateActions.showDetail(foodId)}
        >
          <div>{ list.map(food => (
            <div key={food._id} onClick={() => navigateActions.showDetail(food._id)}>
              {food.shortDesc}
            </div>
          )) }
          </div>
        </SearchFoodForm>
        <AddFoodForm
          {...this.props}
          processFood={addFood}
        />
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

const actionWrapped = ProvideActions(AddFoodPage);
export default connect(mapStateToProps)(actionWrapped);

