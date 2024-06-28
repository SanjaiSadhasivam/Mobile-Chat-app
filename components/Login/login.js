import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import {loginStyles} from './login-css';
import Icons from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../AuthContext';
import {useNavigation} from '@react-navigation/native';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
  Toast,
} from 'react-native-alert-notification';
import {BASE_URL} from '../../utils/API';
import {checkApplicationPermission} from '../../utils/permission';
import {io} from 'socket.io-client';
import {useSocket} from '../../SocketContext';

const Login = props => {
  const {SocketIsActiveUser} = useSocket();

  const navigation = useNavigation();

  const [inputData, setInputData] = useState({
    mobileNumber: '',
    password: '',
  });

  const handleInputChange = (name, value) => {
    setInputData(prev => ({...prev, [name]: value}));
  };
  const {token, setToken} = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      navigation.replace('ChatBody', {screen: 'ChatBody'});
    }
  }, [token, navigation]);

  const onSubmit = async () => {
    const {mobileNumber, password} = inputData;
    if (!mobileNumber || !password) {
      // Alert.alert('Error', 'Please fill all fields');
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please fill all fields',
        button: 'close',
      });

      return;
    } else {
      try {
        const formData = {
          mobileNumber,
          password,
        };
        const {data} = await axios.post(BASE_URL + '/auth/login', formData);

        if (data.status === 'ok') {
          checkApplicationPermission();
          SocketIsActiveUser(data.data._id);

          // const socketio = io(BASE_URL, {
          //   query: {
          //     userId: data.data._id,
          //   },
          //   path: '/mySocket',
          // });

          // socketio.emit('me', data.data._id);

          await AsyncStorage.setItem('authToken', data.token);
          setToken(data.data._id);
          Alert.alert('Success', 'Login successful');

          // Toast.show({
          //   type: ALERT_TYPE.SUCCESS,
          //   title: 'Success',
          //   textBody: 'Login successful',
          //   button: 'close',
          // });
          // props.navigation.navigate('ChatBody');
        } else {
          // Alert.alert('Login failed', 'Insert a valid input');
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Login failed',
            textBody: 'Insert a valid input',
            button: 'close',
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <AlertNotificationRoot>
          <View style={loginStyles.container}>
            <View style={loginStyles.loginImg}>
              <Image source={require('../../assets/images/chatImg.png')} />
            </View>
            <View style={loginStyles.loginTextView}>
              <Text style={loginStyles.loginText}>Login Screen</Text>
            </View>
            <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
              <TextInput
                placeholder="Enter number"
                placeholderTextColor="white"
                style={loginStyles.textInput}
                keyboardType="numeric"
                onChangeText={value => handleInputChange('mobileNumber', value)}
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
                // onPress={() => props.navigation.navigate('ChatBody')}>
                onPress={onSubmit}>
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
        </AlertNotificationRoot>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
