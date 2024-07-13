import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import userSlice from './Slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice
  },
});

export default store;

