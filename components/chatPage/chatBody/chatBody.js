import React from 'react';
import ChatHeader from '../chatHeader/chatHeader';
import {Text, View} from 'react-native';
import {chatBody} from './chatBody-css';

const ChatBody = () => {
  return (
    <>
      <ChatHeader />
      <View style={chatBody.Container}>
        <View style={chatBody.Padding}>
          <Text
            style={{color: '#fff', fontSize: 25, fontFamily: 'Poppins-Bold'}}>
            Chats
          </Text>
        </View>
      </View>
    </>
  );
};

export default ChatBody;
