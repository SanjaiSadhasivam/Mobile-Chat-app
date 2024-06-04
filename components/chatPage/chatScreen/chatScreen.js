import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ChatScreenHeader from './chatScreenHeader/chatScreenHeader';
import {chatScreen} from './chatScreen-css';
import SendIcon from 'react-native-vector-icons/Ionicons';

const ChatScreen = props => {
  const userData = [
    {
      userName: 'Sanjai',
      id: 1,
      messages: 'hi how are you',
      unreadmsg: '4',
      image: require('../../../assets/images/user1.png'),
      mobile: '+91 98765432123',
    },
    {
      userName: 'Jerin',
      id: 2,
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

  const [userDatas, setuserDatas] = useState([]);
  const GetDataById = id => {
    const data = userData.find(i => i.id == id);
    // return data;
    setuserDatas(data);
  };

  useEffect(() => {
    if (props.route.params) {
      GetDataById(props.route.params.id);
    }
  }, []);

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ChatScreenHeader props={props} userDatas={userDatas} />
        <View style={chatScreen.Container}></View>
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
            }}>
            <TextInput
              placeholder="Enter text..."
              placeholderTextColor="white"
              style={chatScreen.textInput}
            />
            <TouchableOpacity style={{paddingHorizontal: 10}}>
              <SendIcon name={'send'} size={25} color="#F3F3F3" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
