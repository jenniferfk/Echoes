import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import AddPostScreen from '../screens/AddPostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeIcon from '../assets/svgIcons/HomeIcon';
import AddPostIcon from '../assets/svgIcons/AddPostIcon';
import ProfileIcon from '../assets/svgIcons/ProfileIcon';
import SearchIcon from '../assets/svgIcons/SearchIcon';
import { MainNavigatorForBottomTabsList,MainNavigatorStackList } from './MainNavigator.type';
import SearchScreen from '../screens/SearchScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileInfoFilteredScreen from '../screens/ProfileInfoFilteredScreen';

const MainBottomTabNavigator = createBottomTabNavigator<MainNavigatorForBottomTabsList>();
const SearchStack= createNativeStackNavigator<MainNavigatorStackList>();

const iconSize = 30;
const EchoesNavigator = () => {

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const tabBarStyle = keyboardVisible ? styles.tabBarWithKeyboard : styles.tabBar;


  
  return (
    
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
    <MainBottomTabNavigator.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, focused }) => {
          let icon;
          if (route.name === 'Home') {
            icon = <HomeIcon color={color} size={iconSize} focused={focused} />;
          }
          else if (route.name === 'AddPost') {
            icon = <AddPostIcon color={color} size={10} focused={focused} />;
          }
          else if (route.name === 'Profile') {
            icon = <ProfileIcon color={color} size={20} focused={focused} />;
          }
          else if (route.name === 'Search') {
            icon = <SearchIcon color={color} size={25} focused={focused} />;
          }
          return icon;
        },
        tabBarStyle: tabBarStyle,
        tabBarLabel: () => null,
      })}
    >
      <MainBottomTabNavigator.Screen name="Home" component={HomeScreen} />
      <MainBottomTabNavigator.Screen name="Search" component={SearchStackScreen}/>
      <MainBottomTabNavigator.Screen name="AddPost" component={AddPostScreen} />
      <MainBottomTabNavigator.Screen name="Profile" component={ProfileScreen} />
    </MainBottomTabNavigator.Navigator>
    </KeyboardAvoidingView>

  );
};
const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="SearchScreen" component={SearchScreen}/>
      <SearchStack.Screen name="ProfileInfo" component={ProfileInfoFilteredScreen} />
    </SearchStack.Navigator>
  );
};
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'flex-end'

  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white', 
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
    
  },
  tabBarWithKeyboard: {
    opacity:0
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EchoesNavigator;
