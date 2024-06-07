import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {loginStyles} from '../Login/login-css';
import {signInStyles} from './signIn-css';
import Icons from 'react-native-vector-icons/Entypo';
import axios from 'axios';

// import {TextInput} from 'react-native-paper';

const SignIn = props => {
  const [inputData, setInputData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (name, value) => {
    setInputData(prev => ({...prev, [name]: value}));
  };

  const onSubmit = async () => {
    const {name, mobileNumber, email, password, confirmPassword} = inputData;

    if (!name || !mobileNumber || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      const formData = {
        name,
        mobileNumber,
        email,
        password,
        // confirmPassword,
      };
      const response = await axios.post(
        'http://10.60.36.78:5000/auth/signup',
        formData,
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Sign up successful');
        props.navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Sign up failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible({
      ...passwordVisible,
      password: !passwordVisible.password,
    });
  };
  const toggleConfirmPasswordVisibility = () => {
    setPasswordVisible({
      ...passwordVisible,
      confirmPassword: !passwordVisible.confirmPassword,
    });
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
              onChangeText={value => handleInputChange('name', value)}
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
              onChangeText={value => handleInputChange('mobileNumber', value)}
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
              onChangeText={value => handleInputChange('email', value)}
            />
          </View>
          <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#5E5C5C',
                borderWidth: 2,
                backgroundColor: '#5E5C5C',
                borderRadius: 30,
              }}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="white"
                secureTextEntry={!passwordVisible.password}
                value={inputData.password}
                // onChangeText={setPassword}
                onChangeText={value => handleInputChange('password', value)}
                style={{
                  flex: 1,
                  color: 'white',
                  fontSize: 16,
                  paddingHorizontal: 20,
                }}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={{paddingHorizontal: 10}}>
                <Icons
                  name={passwordVisible.password ? 'eye-with-line' : 'eye'}
                  size={25}
                  color="#F3F3F3"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#5E5C5C',
                borderWidth: 2,
                backgroundColor: '#5E5C5C',
                borderRadius: 30,
              }}>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="white"
                secureTextEntry={!passwordVisible.confirmPassword}
                value={inputData.confirmPassword}
                onChangeText={value =>
                  handleInputChange('confirmPassword', value)
                }
                style={{
                  flex: 1,
                  color: 'white',
                  fontSize: 16,
                  paddingHorizontal: 20,
                }}
              />
              <TouchableOpacity
                onPress={toggleConfirmPasswordVisibility}
                style={{paddingHorizontal: 10}}>
                <Icons
                  name={
                    passwordVisible.confirmPassword ? 'eye-with-line' : 'eye'
                  }
                  size={25}
                  color="#F3F3F3"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
            <TouchableOpacity
              style={signInStyles.signUpButton}
              // onPress={() => props.navigation.navigate('Login')}>
              onPress={onSubmit}>
              <Text style={{fontSize: 20, fontWeight: 500}}>Signup</Text>
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

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text style={loginStyles.signUpText}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
