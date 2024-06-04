import React from 'react';
import ChatHeader from '../chatHeader/chatHeader';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {chatBody} from './chatBody-css';
import {Badge} from '@react-native-material/core';

const ChatBody = props => {
  const userData = [
    {
      userName: 'Sanjai',
      id: 1,
      messages: 'hi how are you',
      unreadmsg: '4',
      image: require('../../../assets/images/user1.png'),
    },
    {
      userName: 'Jerin',
      id: 2,
      messages: 'Whats up!!!',
      unreadmsg: '2',
      image: require('../../../assets/images/user4.png'),
    },
    {
      userName: 'Jeni',
      id: 3,
      messages: 'Miss you jerin',
      unreadmsg: '16',
      image: require('../../../assets/images/user3.png'),
    },
    {
      userName: 'Suji',
      id: 4,
      messages: 'I love you jerin mama',
      unreadmsg: '1',
      image: require('../../../assets/images/user2.png'),
    },
  ];

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ChatHeader />
        <View style={chatBody.Container}>
          <View style={chatBody.Padding}>
            <Text
              style={{
                color: '#fff',
                fontSize: 25,
                fontFamily: 'Poppins-Bold',
              }}>
              Chats
            </Text>
          </View>

          <View style={chatBody.usersStyle}>
            {userData.map((item, i) => {
              return (
                <>
                  <TouchableOpacity
                    key={i}
                    onPress={() =>
                      props.navigation.navigate('ChatScreen', {id: item.id})
                    }>
                    <View
                      style={{
                        marginTop: 30,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            key={i}
                            style={{
                              color: '#FFC901',
                              fontFamily: 'Poppins-Bold',
                              fontSize: 20,
                              marginRight: 10,
                            }}>
                            {item.userName}
                          </Text>
                          <Badge
                            label={item.unreadmsg}
                            style={{alignSelf: 'flex-start', top: 5}}
                            color="#FFC901"
                          />
                        </View>
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 16,
                              fontFamily: 'Poppins-SemiBold',
                            }}>
                            {item.messages}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          borderColor: '#FFC901',
                          borderWidth: 2,
                          borderRadius: 100, // Half of the width/height for a perfect circle
                          overflow: 'hidden', // Ensure the image stays within the border
                        }}>
                        <Image
                          source={item.image}
                          style={{width: 60, height: 60}}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChatBody;
