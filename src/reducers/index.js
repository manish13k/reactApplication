import { combineReducers } from 'redux';

import { authentication } from './authHandler';
import { registration } from './registration';
import { users } from './users';
import { alert } from './messageHandler';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert
});

export default rootReducer;