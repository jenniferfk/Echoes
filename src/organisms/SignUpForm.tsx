import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Inputs from '../atoms/Inputs';
import ButtonsForForm from '../atoms/ButtonsForFom';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigatorNavigationProp } from '../navigation/MainNavigator.type';

const SignUpForm = () => {
  const navigation = useNavigation<MainStackNavigatorNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameExists, setUsernameExists] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    const checkFormValidity = () => {
      setIsFormValid(email !== '' && fullName !== '' && username !== '' && password !== '' && !usernameExists);
    };

    checkFormValidity();
  }, [email, fullName, username, password, usernameExists]);

  const checkUsernameAvailability = async (inputUsername: string) => {
    try {
      const response = await fetch(`https://660fb86b356b87a55c52315f.mockapi.io/Logs?Username=${inputUsername}`);
      const data = await response.json();
  
      if (Array.isArray(data)) {
        const usernameTaken = data.some((user: any) => user.Username === inputUsername);
        setUsernameExists(usernameTaken);
      } else {
        setUsernameExists(false);
      }
    } catch (error) {
      console.error('Error checking username availability:', error);
    }
  };
  

  const handleNext = async () => {
    if (!isFormValid) return;

    const userData = {
      Email: email,
      Password:password,
      Username:username,
      Name: fullName,
      ImagePath: null, 
      Bio: null,
    };

    try {
      const response = await fetch('https://660fb86b356b87a55c52315f.mockapi.io/Logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Your information has been saved successfully.', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Failed to save your information. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start with filling this form!</Text>
      <Text style={styles.desc}>
        Enter the email where you can be contacted. No one will see this on your profile.
      </Text>
      <Inputs
        placeholdertext="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <Inputs
        placeholdertext="Full Name"
        onChangeText={(text) => setFullName(text)}
      />
      <Inputs
        placeholdertext="Username"
        onChangeText={(text) => {
          setUsername(text);
          checkUsernameAvailability(text);
        }}
      />
      {usernameExists && <Text style={styles.errorText}>Username already exists!</Text>}
      <Text style={styles.usernametext}>(You can always change this username later!)</Text>
      <Inputs
        placeholdertext='Password'
        onChangeText={(text) => setPassword(text)}
      />

      <ButtonsForForm buttontext="Next" onPress={handleNext} disabled={!isFormValid} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    margin:10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    marginLeft: 10,
    color: 'black',
    marginBottom: 10,
  },
  desc: {
    marginLeft: 10,
    fontSize: 17,
    color:'gray'
  },
  usernametext:{
    marginLeft:20,
    marginTop:-6,
    color:'gray'
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
  }
});

export default SignUpForm;
