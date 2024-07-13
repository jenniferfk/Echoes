import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  id: string | null;
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  image: string | null;
}

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  firstName: null,
  lastName: null,
  gender: null,
  image: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserState>) {
      Object.assign(state, action.payload);
      AsyncStorage.setItem('userData', JSON.stringify(action.payload));
    },
    clearUserData(state) {
      Object.assign(state, initialState);
      AsyncStorage.removeItem('userData');
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;
