import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {loginStyles} from './login-css';
import Icons from 'react-native-vector-icons/Entypo';

const Login = props => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
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
                  name={passwordVisible ? 'eye-with-line' : 'eye'}
                  size={25}
                  color="#F3F3F3"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
            <TouchableOpacity
              style={loginStyles.loginButton}
              onPress={() => props.navigation.navigate('ChatBody')}>
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
              Create an account ?
            </Text>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignIn')}>
              <Text style={loginStyles.signUpText}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
