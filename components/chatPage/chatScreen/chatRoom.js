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
import {io} from 'socket.io-client';
import axios from 'axios';
import {useSocket, userSocketContext} from '../../../SocketContext';
import {BASE_URL} from '../../../utils/API';
import useSocketIO from '../../../utils/SocketIO';

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
      if (messages.trim() !== '') {
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
      }
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
            // justifyContent: 'flex-end',
          }}>
          <View>
            {message.length > 0 ? (
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
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  // width: '100%',
                  height: '90%',
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    borderRadius: 20,
                    backgroundColor: '#4E4C4C',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 70,

                    padding: 0,
                    width: '100%',
                    borderColor: '#FFC901',
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 25,
                    }}>
                    No messages found!!☺️
                  </Text>
                </View>
              </View>
            )}
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
