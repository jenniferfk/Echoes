import { combineReducers } from 'redux';
import authReducer from '../Slices/authSlice';
import userReducer from '../Slices/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
