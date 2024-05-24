import React from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {loginStyles} from '../Login/login-css';
import {signInStyles} from './signIn-css';

// import {TextInput} from 'react-native-paper';

const SignIn = props => {
  return (
    <View style={loginStyles.container}>
      <View style={signInStyles.signUpImg}>
        <Image source={require('../../assets/images/chatImg.png')} />
      </View>
      <View style={signInStyles.signUpTextView}>
        <Text style={loginStyles.loginText}>SignUp</Text>
      </View>
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="white"
          style={loginStyles.textInput}
        />
      </View>
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <TextInput
          placeholder="Mobile Number"
          placeholderTextColor="white"
          style={{
            borderColor: '#5E5C5C',
            borderWidth: 2,
            backgroundColor: '#5E5C5C',
            color: 'white', // Change text color
            fontSize: 16, // Change font size
            paddingHorizontal: 20, // Optional: Add padding for better appearance
            borderRadius: 30,
          }}
        />
      </View>
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="white"
          style={{
            borderColor: '#5E5C5C',
            borderWidth: 2,
            backgroundColor: '#5E5C5C',
            color: 'white', // Change text color
            fontSize: 16, // Change font size
            paddingHorizontal: 20, // Optional: Add padding for better appearance
            borderRadius: 30,
          }}
        />
      </View>
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="white"
          style={{
            borderColor: '#5E5C5C',
            borderWidth: 2,
            backgroundColor: '#5E5C5C',
            color: 'white', // Change text color
            fontSize: 16, // Change font size
            paddingHorizontal: 20, // Optional: Add padding for better appearance
            borderRadius: 30,
          }}
        />
      </View>
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="white"
          style={{
            borderColor: '#5E5C5C',
            borderWidth: 2,
            backgroundColor: '#5E5C5C',
            color: 'white', // Change text color
            fontSize: 16, // Change font size
            paddingHorizontal: 20, // Optional: Add padding for better appearance
            borderRadius: 30,
          }}
        />
      </View>

      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <TouchableOpacity style={signInStyles.signUpButton}>
          <Text style={{fontSize: 20, fontWeight: 500}}>Login</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingRight: 30,
          flexDirection: 'row',
          gap: 5,
        }}>
        <Text style={loginStyles.createAccountText}>
          Already have account ?
        </Text>

        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={loginStyles.signUpText}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
