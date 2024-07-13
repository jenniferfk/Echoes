import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { MainNavigatorForLoginList } from './MainNavigator.type';

const Stack = createNativeStackNavigator<MainNavigatorForLoginList>();

const CustomHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();

  if (route.name === 'Signup') {
    return (
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
      </View>
    );
  }

  return null;
};

const LoginMainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerTransparent: true,
      headerTitle: '',
      headerLeft: () => <CustomHeader />
    }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Signup"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backArrow: {
    fontSize: 50,
    color:'black'
  },
});

export default LoginMainNavigator;
