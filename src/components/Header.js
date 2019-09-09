import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Header = ({ navigateActions, location }) => (
  <div className="header">
    <div onClick={() => navigateActions.goHome()}>HOME</div>
    <div onClick={() => navigateActions.addFoodGroup()}>ADD FOOD GROUP</div>
    <div onClick={() => navigateActions.searchFoodGroups()}>SEARCH FOOD GROUP</div>
    <div onClick={() => navigateActions.addFood()}>ADD FOOD</div>
  </div>
);

Header.propTypes = {
  navigateActions: PropTypes.object,
  location: PropTypes.object,
}

export default withRouter(Header);