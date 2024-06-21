import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import ChatScreenHeader from './chatScreenHeader/chatScreenHeader';
import {chatScreen} from './RequestScreen-css';
import SendIcon from 'react-native-vector-icons/Ionicons';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {AuthContext} from '../../../AuthContext';
import io from 'socket.io-client';
import axios from 'axios';
import {userSocketContext} from '../../../SocketContext';
import {BASE_URL} from '../../../utils/API';
import useSocketIO from '../../../utils/SocketIO';
import {showNotification} from '../../../src/notification.android';

const ChatRoom = props => {
  const {roomID} = props.route.params;
  const [messages, setMessages] = useState('');
  const navigation = useNavigation();
  const {userId} = useContext(AuthContext);
  const route = useRoute();
  const scrollViewRef = useRef();
  const {socket, message, setMessage} = useSocketIO(
    userId,
    scrollViewRef,
    roomID,
  );

  const sendMessage = async (senderId, receiverId) => {
    try {
      await axios.post(BASE_URL + '/auth/sendMessage', {
        senderId,
        receiverId,
        messages,
      });
      socket.emit('sendMessage', {
        senderId,
        receiverId,
        messages,
        roomid: roomID,
      });
      setMessages('');

      setTimeout(() => {
        fetchMessages();
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const senderId = userId;
      const receiverId = props.route.params.receiverId;
      const response = await axios.get(BASE_URL + '/auth/messages', {
        params: {senderId, receiverId},
      });
      setMessage(response.data);
      const lastMessage =
        response.data.length > 0
          ? response.data[response.data.length - 1]
          : 'No messages';
      const messagerId = response.data.map(item => item.senderId._id);
      console.log(messagerId, 'response.data');
      // if (messagerId.includes(userId)) {
      //   showNotification('LetsChat', lastMessage.messages);
      // }
      scrollViewRef.current?.scrollToEnd({animated: true});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <View style={{flexGrow: 1}}>
      <ChatScreenHeader props={props} chatName={props.route.params.name} />
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#2C2929'}}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({animated: true})
          }
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}>
          <View style={chatScreen.Container}>
            {message?.map((item, index) => {
              const isSender = item?.senderId?._id == userId;

              return (
                <View
                  style={{
                    alignItems: !isSender ? 'flex-start' : 'flex-end',
                  }}
                  key={index}>
                  <View
                    style={
                      isSender
                        ? chatScreen.chatScreenSender
                        : chatScreen.chatScreenReceiver
                    }>
                    <Text style={chatScreen.chatScreenText}>
                      {item.messages}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
            onPress={() => sendMessage(userId, props.route.params.receiverId)}>
            <SendIcon name={'send'} size={30} color="#F3F3F3" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatRoom;
