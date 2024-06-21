import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ChatScreenHeader from './chatScreenHeader/chatScreenHeader';
import {chatScreen} from './RequestScreen-css';
import SendIcon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../../AuthContext';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {loginStyles} from '../../Login/login-css';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from 'react-native-alert-notification';
import {BASE_URL} from '../../../utils/API';
// import 'core-js/stable/atob';

const ChatScreen = props => {
  const {userId} = useContext(AuthContext);
  const route = useRoute();

  const userData = [
    {
      userName: 'Sanjai',
      id: '6668062ad99d906fe834f104',
      messages: 'hi how are you',
      unreadmsg: '4',
      image: require('../../../assets/images/user1.png'),
      mobile: '+91 98765432123',
    },
    {
      userName: 'dummy',
      id: '6666a1949188f496e1abb968',
      messages: 'Whats up!!!',
      unreadmsg: '2',
      image: require('../../../assets/images/user4.png'),
      mobile: '+91 8765456789',
    },
    {
      userName: 'Jeni',
      id: 3,
      messages: 'Miss you jerin',
      unreadmsg: '16',
      image: require('../../../assets/images/user3.png'),
      mobile: '+91 8765242311',
    },
    {
      userName: 'Suji',
      id: 4,
      messages: 'I love you jerin mama',
      unreadmsg: '1',
      image: require('../../../assets/images/user2.png'),
      mobile: '+91 787443425133',
    },
  ];

  const [userDatas, setUserDatas] = useState({});
  // const GetDataById = id => {
  //   const data = userData.find(i => i.id == id);
  //   setUserDatas(data);
  // };

  //   if (props.route.params) {
  //     GetDataById(props.route.params.receiverId);
  //   }
  // }, [props.route.params]);

  const [messages, setMessages] = useState('');
  const [inputText, setInputText] = useState('');
  const [connectButton, setconnectButton] = useState(false);

  const handleInput = text => {
    setInputText(text);
  };

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        {id: messages.length.toString(), text: inputText},
      ]);
      setInputText('');
    }
  };

  const sentRequest = async () => {
    try {
      const userData = {
        senderId: userId,
        receiverId: props.route.params.receiverId,
      };

      const response = await axios.post(
        BASE_URL + '/auth/sentrequest',
        userData,
      );

      if (response.status == 200) {
        // setMessages('');
        // Alert.alert('Your request send');
        setconnectButton(true);
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Your request send 🥰',
          textBody: 'Wait for response',
          button: 'Ok',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRequest = async () => {
    try {
      const userData = {
        data: {
          senderId: userId,
          receiverId: props.route.params.receiverId,
        },
      };

      const response = await axios.delete(
        BASE_URL + '/auth/deleterequest',
        userData,
      );
      if (response.status == 200) {
        setconnectButton(false);
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Your request revoked 😥',
          button: 'close',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#2C2929'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ChatScreenHeader props={props} userDatas={userDatas} />
        <AlertNotificationRoot>
          <View style={chatScreen.Container}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // width: '100%',
                height: '100%',
              }}>
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: '#4E4C4C',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                  width: '100%',
                }}>
                <View style={{width: '100%', alignItems: 'center'}}>
                  <Image
                    source={require('../../../assets/images/requestPageLogo.png')}
                    style={{width: 270, height: 160}}
                  />
                </View>

                <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
                  {!connectButton ? (
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        backgroundColor: '#FFC901',
                        // padding: 10,
                        borderRadius: 10,
                        paddingHorizontal: 30,
                        paddingVertical: 5,
                        marginTop: 20,
                        justifyContent: 'center',
                      }}
                      // onPress={() => props.navigation.navigate('ChatBody')}>
                      onPress={sentRequest}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          fontFamily: 'Poppins-Bold',
                        }}>
                        Let's Connect
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',

                        borderColor: '#FFC901',
                        borderWidth: 2,
                        borderRadius: 10,
                        paddingHorizontal: 30,
                        paddingVertical: 5,
                        marginTop: 20,
                        justifyContent: 'center',
                      }}
                      onPress={deleteRequest}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          fontFamily: 'Poppins-Bold',
                          color: '#FFC901',
                        }}>
                        Delete Request
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </AlertNotificationRoot>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
