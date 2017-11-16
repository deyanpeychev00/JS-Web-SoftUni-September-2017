import { combineReducers } from 'redux';
import chirps from './chirper';
import user from './user';
import requester from './requester';


export default combineReducers({chirps, user, requester});
