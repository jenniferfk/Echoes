import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Inputs from  '../atoms/Inputs';
import ButtonsForForm from '../atoms/ButtonsForFom';
import PasswordInputs from '../atoms/PasswordInputs';
import { useDispatch as useDispatchFromRedux } from 'react-redux';
import { setAuthToken } from '../redux/Slices/authSlice';
import { setUserData } from '../redux/Slices/userSlice';

const LoginForm = () => {
  const dispatch = useDispatchFromRedux();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await result.json();
      if (result.ok) {
        console.log("User data:", data);
        dispatch(setAuthToken(data.token));
        dispatch(
          setUserData({
            id: data.id,
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            image: data.image,
          })
        );
      } else {
        console.log('Login Failed', data.message); 
      }


    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
    useEffect(() => {
      setIsFormValid(username !== '' && password !== '');
    }, [username, password]);


  return (
    <View style={styles.container}>
     <Inputs placeholdertext="Enter your Username" onChangeText={(text) => setUsername(text)}/>
     <PasswordInputs placeholdertext="Password" onChangeText={(text) => setPassword(text)} />
     <ButtonsForForm buttontext="Log in" onPress={handleLogin} disabled={!isFormValid}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center'
  },
  forgottext:{
    color:'#636262',
    fontSize:18
  }
});

export default LoginForm;
