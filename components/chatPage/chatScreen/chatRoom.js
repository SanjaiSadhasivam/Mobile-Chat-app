import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import ChatScreenHeader from './chatScreenHeader/chatScreenHeader';
import {chatScreen} from './RequestScreen-css';
import SendIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AuthContext} from '../../../AuthContext';
import io from 'socket.io-client';
import axios from 'axios';
import {userSocketContext} from '../../../SocketContext';
const ChatRoom = props => {
  const [messages, setMessages] = useState('');
  const [inputText, setInputText] = useState('');
  const {socket} = userSocketContext();
  const navigation = useNavigation();

  const {userId} = useContext(AuthContext);
  const route = useRoute();

  const sockets = io('http://10.60.36.78:4000');
  const sendMessage = async (senderId, receiverId) => {
    console.log(senderId, 'senderId');
    console.log(receiverId, 'receiverId');
    console.log(messages, 'message');

    try {
      await axios.post('http://10.60.36.78:4000/auth/sendMessage', {
        senderId,
        receiverId,
        messages,
      });
      sockets.emit('sendMessage', {senderId, receiverId, messages});
      setMessages('');
      //   setTimeout(() => {

      //   }, timeout);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#2C2929'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ChatScreenHeader props={props} chatName={props.route.params.name} />
        <View style={chatScreen.Container}>
          <View style={{alignItems: 'flex-start'}}>
            <View style={chatScreen.chatScreenReceiver}>
              <Text style={chatScreen.chatScreenText}>
                {/* {userDatas.messages} */}
                sasasassas
              </Text>
            </View>
          </View>

          {/* {messages.map((message, index) => ( */}
          {/* <View style={{alignItems: 'flex-end'}}>
              <View style={chatScreen.chatScreenSender}>
                <Text style={chatScreen.chatScreenText}>sasas</Text>
              </View>
            </View> */}
          {/* ))} */}
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
              value={messages} // Set the value to the state variable
              onChangeText={setMessages}
              multiline // Enable multiline input
              numberOfLines={1} // Set initial number of lines to 1
            />
            <TouchableOpacity
              style={{paddingHorizontal: 10}}
              onPress={() =>
                sendMessage(userId, props.route.params.receiverId)
              }>
              <SendIcon name={'send'} size={30} color="#F3F3F3" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
