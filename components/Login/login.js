import React from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {loginStyles} from './login-css';
// import {TextInput} from 'react-native-paper';

const Login = props => {
  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.loginImg}>
        <Image source={require('../../assets/images/chatImg.png')} />
      </View>
      <View style={loginStyles.loginTextView}>
        <Text style={loginStyles.loginText}>Login Screen</Text>
      </View>
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="white"
          style={loginStyles.textInput}
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
            color: 'white',
            fontSize: 16,
            paddingHorizontal: 20,
            borderRadius: 30,
          }}
        />
      </View>
      {/* <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingRight: 30,
        }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
          <Text variant="labelSmall" style={loginStyles.forgetText}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View> */}
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <TouchableOpacity style={loginStyles.loginButton}>
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
        <Text style={loginStyles.createAccountText}>Create an account ?</Text>

        <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
          <Text style={loginStyles.signUpText}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
