import React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";

interface PublishButtonProps {
  buttontext: string;
  onPress: () => void; 
  disabled: boolean;
}

const PublishButton = ({ buttontext, onPress,disabled  }: PublishButtonProps) => {
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
    margin: windowWidth*0.04,
    borderColor: 'black',
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  placeholder: {
    alignSelf: 'center',
    left: 10,
    color: '#D3D4EB',
    fontWeight: 'bold',
    fontSize: 23,
    letterSpacing: 0.6,
  },
});

export default PublishButton;
