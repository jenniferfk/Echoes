import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";

interface InputsProps {
  placeholdertext: string;
  onChangeText: (text: string) => void;
}

const Inputs = ({ placeholdertext, onChangeText }: InputsProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handlePress = () => {
    if (isFocused) {
      Keyboard.dismiss();
      setIsFocused(false); // .so that when i click outside the input, the focus isnt on the input anymore and they keyboard closes
    }
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          underlineColorAndroid="transparent"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

  const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.08,
    marginVertical: windowHeight * 0.02,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "lightgray",
    justifyContent: "center",
    backgroundColor: "white",
    width: "90%",
  },
  input: {
    flex: 1,
    paddingVertical: windowHeight * 0.014,
    color: 'black',
  },
  placeholder: {
    position: "absolute",
    left: windowHeight * 0.028,
    color: "#ababab",
    fontWeight: "bold",
    fontSize: windowHeight * 0.025,
  },
});

export default Inputs;
