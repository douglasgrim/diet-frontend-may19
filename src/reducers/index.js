import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import userInputReducer from './userInputReducer';
import { connectRouter } from 'connected-react-router'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  data: dataReducer,
  userInput: userInputReducer,
});

export default rootReducer;
