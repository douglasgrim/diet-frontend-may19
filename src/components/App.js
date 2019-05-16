/* eslint-disable import/no-named-as-default */
import { Link, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import LoginPage from './pages/LoginPage';
import BoomPage from './pages/BoomPage';
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {

  render() {
    const { token } = this.props;
    return (
      <div>
        <div>
          Header goes here {token}
        </div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          {token && <Route exact path="/boom" component={BoomPage} />}
          <Route component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

const mapStateToProps = ({ data: { token } }) => ({ token });

export default connect(mapStateToProps)(hot(module)(App));
