import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
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
        message: messages,
      };

      const response = await axios.post(
        'http://10.60.36.78:5000/auth/sentrequest',
        userData,
      );
      // console.log(response, 'response');
      if (response.status == 200) {
        setMessages('');
        Alert.alert('Your request send');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#2C2929'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ChatScreenHeader props={props} userDatas={userDatas} />
        <View style={chatScreen.Container}>
          <View style={{alignItems: 'flex-start'}}>
            {/* <View style={chatScreen.chatScreenReceiver}>
              <Text style={chatScreen.chatScreenText}>
                {userDatas.messages}
              </Text>
            </View> */}
          </View>
        </View>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 5,
            backgroundColor: '#2C2929',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: '#5E5C5C',
              borderWidth: 2,
              backgroundColor: '#5E5C5C',
              borderRadius: 30,
              justifyContent: 'space-between',
              paddingRight: 20,
            }}>
            <TextInput
              placeholder="Enter text..."
              placeholderTextColor="white"
              style={chatScreen.textInput}
              onChangeText={setMessages}
              multiline // Enable multiline input
              numberOfLines={1} // Set initial number of lines to 1
              value={messages} // Set the value to the state variable
            />
            <TouchableOpacity
              style={{paddingHorizontal: 10}}
              onPress={sentRequest}>
              <SendIcon name={'send'} size={30} color="#F3F3F3" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
