import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoadingIndicator from '../simple/LoadingIndicator';
import DebouncedInput from '../simple/DebouncedInput';

import AddFoodForm from '../containers/AddFoodForm';

import * as userInputActions from '../../actions/userInputActions';
import * as externalActions from '../../actions/externalActions';
import * as navigateActions from '../../actions/navigateActions';


export class BoomPage extends React.Component {

  render() {
    const {
      search,
      userInputActions,
      externalActions,
      list,
      loadingIndicator,
    } = this.props;
    return (
      <div>
        <div>Search</div>
        <div>
          <DebouncedInput
            type="text"
            value={ search }
            onChange={value => userInputActions.userSetText({ search: value })}
            debouncedFunc={value => externalActions.searchFood(value)}
            debouncedTime={500}
          />
          <button onClick={() => externalActions.searchFood(search)}>Search</button>
        </div>
        <div>{ list.map(food => (
          <div key={food._id} onClick={() => navigateActions.showDetail(food._id)}>
            {food.shortDesc}
          </div>
        )) }
          <AddFoodForm {...this.props} />
          { loadingIndicator && <LoadingIndicator /> }
        </div>
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
  const list = searchResults.map(key => data[key]);
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

const mapDispatchToProps = (dispatch) => ({
  userInputActions: bindActionCreators(userInputActions, dispatch),
  externalActions: bindActionCreators(externalActions, dispatch),
  navigateActions: bindActionCreators(navigateActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoomPage);
