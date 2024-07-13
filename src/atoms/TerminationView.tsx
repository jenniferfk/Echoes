import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const TerminationView = () => {
  return (
    <View style={styles.view}>
    <Text style={styles.content}>
    We reserve the right to terminate or suspend your access to the App at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.</Text>
  </View>
  )
}

export default TerminationView

const styles = StyleSheet.create({
  view:{
    margin:10
  },
  content: {
    marginBottom: 10,
    color:'black'
  },
  });
  
