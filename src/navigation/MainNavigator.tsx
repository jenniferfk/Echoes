import React, { useEffect, useState } from 'react';
import EchoesNavigator from './EchoesNavigator';
import LoginMainNavigator from './LoginMainNavigator';
import {  useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/Reducers/rootreducer';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { MainDrawerNavigatorNavigationProp, MainNavigatorForDrawerList } from './MainNavigator.type';
import AboutUs from '../screens/AboutUs';
import TermsOfService from '../screens/EditProfileScreen';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { clearAuthToken, setAuthToken } from '../redux/Slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import LikesScreen from '../screens/LikesScreen';


const Drawer = createDrawerNavigator<MainNavigatorForDrawerList>();

const MainNavigator = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state: RootState) => state.auth.authToken);
  const navigation = useNavigation<MainDrawerNavigatorNavigationProp>();

  useEffect(() => {
    const checkAndSetAuthToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          dispatch(setAuthToken(storedToken));
        }
      } catch (error) {
        console.error('Error fetching authToken from AsyncStorage:', error);
      }
    };

    checkAndSetAuthToken();
  }, []);


  const goToApp = () => {
    navigation.navigate('AppDrawer');
  };

  const CustomDrawerHeader = () => {
    const [userData, setUserData] = useState<{
      firstName: string | null;
      lastName: string | null;
      image: string | null;
      username: string | null;
    }>({
      firstName: null,
      lastName: null,
      image: null,
      username: null,
    });
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('userData');
          if (jsonValue !== null) {
            const parsedData = JSON.parse(jsonValue);
            setUserData(parsedData);
          }
        } catch (error) {
          console.error('Error fetching user data from AsyncStorage:', error);
        }
      };
  
      fetchUserData();
    }, []);
  
    if (!userData.username || !userData.firstName || !userData.lastName) {
      return null;
    }
  
    return (
      <View style={styles.iconview}>
        <Pressable onPress={goToApp}>
          <View style={styles.profilePictureContainer}>
            {userData.image ? (
              <Image source={{ uri: userData.image ?? '' }} style={styles.profilePicture} />
            ) : (
              <View style={styles.blueCircle} />
            )}
          </View>
        </Pressable>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{userData.firstName} {userData.lastName}</Text>
          <Text style={styles.username}>@{userData.username}</Text>
        </View>
      </View>
    );
  };
  const handleSignOut = () => {
    dispatch(clearAuthToken());
  };


  const CustomDrawerContent = (props: any) => (
    <DrawerContentScrollView {...props} contentContainerStyle={{flexGrow: 1}}>
      <CustomDrawerHeader  />
      <DrawerItemList {...props} />
      <View style={styles.signOutButtonContainer}>
        <Pressable  onPress={handleSignOut}>
          <Text style={styles.signouttext}>Sign Out </Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
  return (
    <>
    {authToken ? (
            <Drawer.Navigator 
            screenOptions={{
              headerStyle: {
                backgroundColor: '#D3D4EB', 
                height:50
              },
              
            }}
            
            drawerContent={CustomDrawerContent}
            >
            <Drawer.Screen name="AppDrawer" component={EchoesNavigator}
            options={{
              headerTitle: () => null,
              drawerLabel: () => null,
              unmountOnBlur: true, 
              drawerActiveBackgroundColor:'transparent'
            }}/>
            <Drawer.Screen name="Likes" component={LikesScreen} options={{ headerShown: false,headerTitle: () => null,drawerLabel: 'Liked Posts',swipeEnabled: false }} />
            <Drawer.Screen name="Terms" component={TermsOfService} options={{ headerShown: false,headerTitle: () => null,drawerLabel: 'Terms of Service',swipeEnabled: false }} />
            <Drawer.Screen name="Aboutus" component={AboutUs} options={{headerShown: false, headerTitle: () => null, swipeEnabled: false,drawerLabel: 'About Us' }}/>
          </Drawer.Navigator>
        ) : (
           <LoginMainNavigator/>
        )}
    </>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  iconview:{
    bottom:-30
  },
  profilePictureContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop:50,
    bottom:-6
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  blueCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#86d6f2',
  },
  signOutButtonContainer: {
    marginTop: 'auto',
    marginBottom: 16,
    alignItems: 'center',
    flexDirection:'column-reverse',
    top:30
  },
  signouttext:{
    color: Platform.OS === 'ios' ? 'black' : '#c472f7' 
  },
  userInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  username: {
    fontSize: 15,
    color: 'gray',
  },
});