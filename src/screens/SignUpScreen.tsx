import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import SignUpForm from '../organisms/SignUpForm';

const SignUpScreen = () => {
  return (
    <>
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.content}><SignUpForm/></View>
      </View>
      </ScrollView>
    </>
  )
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  content: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
