import { View, Text, StyleSheet, Keyboard, KeyboardAvoidingView, Platform, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddPostInput from '../organisms/AddPostForm';

const AddPostScreen = () => {

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [title, setTitle] = useState('');
  
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
  <>
  <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-Dimensions.get('window').height * 0.2}
    >
    <View>
      <Text style={styles.addposttitle}>Add A Post!</Text>
    </View>
    <View>
      <AddPostInput placeholdertext='Write Something' />
    </View>
    </KeyboardAvoidingView>
  </>
  )
}

export default AddPostScreen;

const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D4EB',
  },
addposttitle:{
  alignSelf:'center',
  fontSize:20,
  margin:15,
  color:'black',
  fontWeight:'bold'
},
})