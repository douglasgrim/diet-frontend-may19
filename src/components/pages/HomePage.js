import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ProvideId from './ProvideId';

import AddFoodForm from '../containers/AddFoodForm';

import * as userInputActions from '../../actions/userInputActions';
import * as externalActions from '../../actions/externalActions';


export class BoomPage extends React.Component {

  render() {
    const {
      search,
      userInputActions,
      externalActions,
      searchResults,
      list,
      shortDesc,
    } = this.props;
    return (
      <div>
        <div>Search</div>
        <div>{shortDesc}</div>
        <div>
          <input
            type="text"
            value={ search }
            onChange={evt => userInputActions.userSetText({ search: evt.target.value })}
          />
          <button onClick={() => externalActions.searchFood(search)}>Search</button>
        </div>
        <div>{ list.map(food => <div key={food._id}>{food.shortDesc}</div>) }
        <AddFoodForm {...this.props} />
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
  const { searchResults = [] } = data;
  const list = searchResults.map(key => data[key]);
  return { search, list,   protein,
  lipidTot,
  sugarTot,
  carbohydrt,
  energKcal,
  shortDesc,
  servingSize, };
}

const mapDispatchToProps = (dispatch) => ({
  userInputActions: bindActionCreators(userInputActions, dispatch),
  externalActions: bindActionCreators(externalActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoomPage);
