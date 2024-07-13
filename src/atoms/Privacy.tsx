import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Privacy = () => {
  return (
    <View style={styles.view}>
    <Text style={styles.content}>
    Your privacy is important to us. Our Privacy Policy explains how we collect, use, and disclose information about you. By using the App, you consent to the collection, use, and disclosure of your information as described in our Privacy Policy.
    </Text>
  </View>
  )
}

export default Privacy

const styles = StyleSheet.create({
  view:{
    margin:10
  },
  content: {
    marginBottom: 10,
    color:'black'
  },
  });
  
