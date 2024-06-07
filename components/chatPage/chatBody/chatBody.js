import React, {useEffect, useCallback} from 'react';

import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
} from 'react-native';
import {chatBody} from './chatBody-css';
import {Badge} from '@react-native-material/core';
import ThreeDot from 'react-native-vector-icons/Entypo';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const ChatBody = props => {
  const navigation = useNavigation();
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

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <MenuProvider style={chatBody.chatScreenlayout}>
          <View style={chatBody.Container}>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#f3f3f3'}}>
              <View style={chatBody.headerStyle}>
                <Image
                  source={require('../../../assets/images/chatHeader.png')}
                  // style={{height: 60, width: 60}}
                />

                <Menu>
                  <MenuTrigger>
                    <ThreeDot
                      name="dots-three-vertical"
                      color="#F3F3F3"
                      size={23}
                    />
                  </MenuTrigger>
                  <MenuOptions customStyles={{optionsContainer: {width: 100}}}>
                    <MenuOption
                      onSelect={() => {
                        props.navigation.navigate('Login');
                      }}
                      text="Logout"
                    />
                  </MenuOptions>
                </Menu>
              </View>
            </View>
            <View style={{padding: 10}}>
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
                    <View key={i}>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('ChatScreen', {id: item.id})
                        }>
                        <View
                          style={{
                            marginTop: 20,
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
                              // marginRight: 15,
                              height: 50,
                              width: 50,
                            }}>
                            <Image
                              source={item.image}
                              style={{width: 50, height: 50}}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </MenuProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChatBody;
