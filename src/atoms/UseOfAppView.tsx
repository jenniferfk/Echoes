import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const UseOfAppView = () => {
  return (
    <View style={styles.view}>
    <Text style={styles.content}>
      a. Eligibility: You must be at least 13 years old to use the App. By using the App, you represent and warrant that you are at least 13 years old.
    </Text>
    <Text style={styles.content}>
    b. User Content: You are solely responsible for any content you post or share on the App ("User Content"). You retain ownership of your User Content, but by posting it on the App, you grant us a non-exclusive, royalty-free, worldwide, sublicensable, and transferable license to use, reproduce, distribute, modify, adapt, publicly perform, and publicly display your User Content in connection with the App.</Text>
    <Text style={styles.content}>
    c. Prohibited Conduct: You agree not to engage in any of the following prohibited activities:

      Violating any applicable laws or regulations.
      Posting or sharing content that is illegal, harmful, threatening, abusive, defamatory, obscene, or otherwise objectionable.
      Harassing, bullying, or intimidating other users.
      Impersonating any person or entity.
      Interfering with or disrupting the operation of the App.
      Using the App for commercial purposes without our prior written consent.</Text>
  </View>
  )
}

export default UseOfAppView

const styles = StyleSheet.create({
  view:{
    margin:10
  },
  content: {
    marginBottom: 10,
    color:'black'
  },
  });
  
