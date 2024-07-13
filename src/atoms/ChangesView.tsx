import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ChangesToTermsView = () => {
  return (
    <View style={styles.view}>
    <Text style={styles.content}>
    We may revise these Terms from time to time. The most current version will always be available within the App. By continuing to use the App after we make changes, you agree to be bound by the revised Terms.</Text>
  </View>
  )
}

export default ChangesToTermsView

const styles = StyleSheet.create({
  view:{
    margin:10
  },
  content: {
    marginBottom: 10,
    color:'black'
  },
  });
  
