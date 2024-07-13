import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  authToken: string | null;
  isSignedIn: boolean;
}

const initialState: AuthState = {
  authToken: null,
  isSignedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken(state, action: PayloadAction<string>) {
      state.authToken = action.payload;
      state.isSignedIn = true; 
      AsyncStorage.setItem('authToken', state.authToken);
    },
    clearAuthToken(state) {
      state.authToken = null;
      state.isSignedIn = false; 
      AsyncStorage.removeItem('authToken');
    },
  },
});

export const { setAuthToken, clearAuthToken } = authSlice.actions;

export default authSlice.reducer;

