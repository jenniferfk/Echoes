import React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {MainStackNavigatorNavigationProp} from '../navigation/MainNavigator.type'


interface ButtonsProps {
  buttontext: string;
}

const CreateAccountButton = ({ buttontext }: ButtonsProps) => {
  const navigation= useNavigation<MainStackNavigatorNavigationProp>();
  const gotoSignUp=()=>{
    navigation.navigate ('Signup');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => gotoSignUp()} >
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
    borderColor:'#86d6f2',
    backgroundColor:'none',
    justifyContent:'center'
  },
  placeholder: {
    alignSelf:'center',
    left: 10,
    color: '#070708',
    fontSize: windowHeight * 0.026,
    letterSpacing: 0.6,
  },
});

export default CreateAccountButton;
