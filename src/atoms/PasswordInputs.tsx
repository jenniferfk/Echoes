import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { GestureResponderEvent } from 'react-native';
interface InputsProps {
  placeholdertext: string;
  onChangeText: (text: string) => void;
}

const PasswordInputs = ({ placeholdertext, onChangeText }: InputsProps) => {
  const [text, setText] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handlePress = () => {
    if (isFocused) {
      Keyboard.dismiss();
      setIsFocused(false);
    }
  };

  const handleIconPress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    togglePasswordVisibility();
    console.log("Icon pressed");
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!isFocused && !text ? (
          <Text style={styles.placeholder}>{placeholdertext}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={(inputText) => {
            setText(inputText);
            onChangeText(inputText);
          }}
          secureTextEntry={!isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {isFocused && (
          <View style={styles.eyeIcon} onTouchEnd={handleIconPress}>
            <Text style={styles.eye}>{isPasswordVisible ? '👁️' : '🔒'}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PasswordInputs;

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.08,
    marginVertical: windowHeight * 0.02,
    borderWidth: 1,
    width: '90%',
    borderRadius: 10,
    borderColor: 'lightgray',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative', 
  },
  input: {
    height: 60,
    paddingVertical: windowHeight * 0.014,
    flex: 1,
    color: 'black',
  },
  placeholder: {
    position: 'absolute',
    left: windowHeight * 0.028,
    color: '#ababab',
    fontWeight: 'bold',
    fontSize: windowHeight * 0.025,
    letterSpacing: 0.6,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
    zIndex: 1, 
  },
  eye: {
    fontSize: 24,
  },
});
