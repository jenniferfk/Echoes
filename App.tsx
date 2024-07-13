import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import BootSplash from "react-native-bootsplash";
import { Provider } from 'react-redux';
import store from './src/redux/store';
import notifee from '@notifee/react-native';

const App = () => {
  useEffect(() => {
    setTimeout(()=>{
  BootSplash.hide();
    },2000);
},[]);
useEffect(() => {
  const requestPermissions = async () => {
    const settings = await notifee.requestPermission();
  };
  requestPermissions();
  
}, []);

const linking = {
  prefixes: ['echoes://'],
  config: {
    screens: {
      Aboutus: 'AboutUs',
    }
  },
};
/*
by running adb shell am start -a android.intent.action.VIEW -d "echoes://AboutUs"
it opened the app and took me successfully to the about us page(IF AUTHENTICATED). 
if not, it takes me to login page, and whn you log in, the first page shown would be the about us. 
*/
  return (
    <Provider store={store} >
    <NavigationContainer linking={linking}>
      <MainNavigator />
    </NavigationContainer>
    </Provider>
  );
};

export default App;