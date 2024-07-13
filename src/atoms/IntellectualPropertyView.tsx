import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const IntellectualPropertyView = () => {
  return (
    <View style={styles.view}>
    <Text style={styles.content}>
    All content, trademarks, logos, and other intellectual property rights related to the App are owned by us or our licensors. You may not use, reproduce, modify, or distribute any of the content on the App without our prior written consent.</Text>
  </View>
  )
}

export default IntellectualPropertyView

const styles = StyleSheet.create({
  view:{
    margin:10
  },
  content: {
    marginBottom: 10,
    color:'black'
  },
  });
  
