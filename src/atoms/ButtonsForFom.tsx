import React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";

interface ButtonsProps {
  buttontext: string;
  onPress: () => void; 
  disabled: boolean;
}

const ButtonsForForm = ({ buttontext, onPress,disabled  }: ButtonsProps) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} disabled={disabled}> 
        <Text style={styles.placeholder}>{buttontext}</Text>
      </Pressable>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.06,
    marginVertical: windowHeight * 0.02,
    borderWidth: 1,
    width: windowWidth * 0.9,
    borderRadius: windowHeight * 0.04,
    borderColor: '#c472f7',
    backgroundColor: '#c472f7',
    justifyContent: 'center',
  },
  placeholder: {
    alignSelf: 'center',
    left: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowHeight * 0.027,
    letterSpacing: 0.6,
  },
});

export default ButtonsForForm;
