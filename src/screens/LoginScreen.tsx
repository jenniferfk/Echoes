import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, ScrollView, Dimensions } from 'react-native';
import LoginForm from '../organisms/LoginForm';

const LoginScreen = () => {
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-Dimensions.get('window').height * 0.2}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.appIcon}>
          <Text style={styles.echoestitle}>ECHOES</Text>
        </View>
        <LoginForm/>
      </ScrollView>
      {!keyboardVisible && (
        <View style={styles.footer}>
          <View style={styles.createButtonContainer}>
            <Text style={styles.createText}>You can always log out when you want.</Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  content: {
    flexGrow: 1,
    paddingBottom: windowHeight * 0.03,
  },
  appIcon:{
    alignSelf:"center",
    marginVertical: windowHeight * 0.08,
  },
  echoestitle:{
    color:'#c472f7',
    fontSize: windowHeight * 0.063,
  },
  footer: {
    position: 'absolute',
    bottom: windowHeight * 0.02,
    left: 0,
    right: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: windowHeight * 0.02,
  },
  createButtonContainer: {
    width: '90%',
    left: windowWidth * 0.01,
    top: 0,
  },
  hidden: {
    opacity: 0,
  },
  createText:{
    color:'black',
    alignSelf:'center',
  }
});

export default LoginScreen;
