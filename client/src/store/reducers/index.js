import { combineReducers } from 'redux';
import authReducers from './authReducers';
import artistReducers from './artistReducers';
import errorReducer from './errorReducers';

export default combineReducers({
  artist: artistReducers,
  auth: authReducers,
  errors: errorReducer
});
