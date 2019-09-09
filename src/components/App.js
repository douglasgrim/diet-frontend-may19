/* eslint-disable import/no-named-as-default */
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import ProvideActions from './hoc/ProvideActions';

import Header from './Header';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddFoodGroupPage from './pages/AddFoodGroupPage';
import EditFoodPage from './pages/EditFoodPage';
import SearchFoodGroups from './pages/SearchFoodGroups';
import AddFoodPage from './pages/AddFoodPage';
import KeypairPage from './pages/KeypairPage';

import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {

  render() {
    const {
      token,
      navigateActions,
    } = this.props;
    return (
      <div className="app">
        <Header navigateActions={navigateActions} />
        <div className="app-contents">
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/keypair" component={KeypairPage} />
            {token && <React.Fragment>
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/detail/:foodId" component={DetailPage} />
              <Route exact path="/add-food-group" component={AddFoodGroupPage} />
              <Route exact path="/edit-food/:foodId" component={EditFoodPage} />
              <Route exact path="/search-food-groups" component={SearchFoodGroups} />
              <Route exact path="/add-food" component={AddFoodPage} />
            </React.Fragment>}
            <Route component={LoginPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

const mapStateToProps = ({ data: { token } }) => ({ token });

const provideWrapped = ProvideActions(App);

export default connect(mapStateToProps)(hot(module)(provideWrapped));
