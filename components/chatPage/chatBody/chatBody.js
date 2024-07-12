import React, {
  useEffect,
  useCallback,
  useState,
  useContext,
  useRef,
} from 'react';

import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import {chatBody} from './chatBody-css';
import {Badge} from '@react-native-material/core';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import axios from 'axios';
import {AuthContext} from '../../../AuthContext';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoutIcon from 'react-native-vector-icons/MaterialIcons';
import ProfileIcon from 'react-native-vector-icons/FontAwesome';
import Cancel from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../utils/API';
import useSocketIO from '../../../utils/SocketIO';
import {
  eventEmitter,
  showNotification,
  showRequests,
} from '../../../src/notification.android';
import {useSocket} from '../../../SocketContext';
import {Avatar} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from 'react-native-alert-notification';
import {ActivityIndicator} from 'react-native';

const CustomBadge = ({label, color, style}) => {
  return (
    <View style={[styles.badgeContainer, style, {backgroundColor: color}]}>
      {label && <Text style={styles.badgeText}>{label}</Text>}
    </View>
  );
};

const ChatBody = props => {
  const layout = useWindowDimensions();
  const route = useRoute();
  const scrollViewRef = useRef(null);
  const {message, setMessage} = useSocketIO(userId, scrollViewRef);
  const {socket, SocketRemoveActiveUser, SocketIsActiveUser, activeUsers} =
    useSocket();
  const [newMessage, setNewMessage] = useState('');
  const [existUserId, setExistUserId] = useState([]);
  const [unReadMsg, setUnReadMsg] = useState('');
  const [newRequest, setnewRequest] = useState(false);

  // console.log(activeUsers, 'activeUsers');

  useEffect(() => {
    if (!socket) return;

    const handleNotification = newMessages => {
      setNewMessage(newMessages);
    };

    const handleUnreadMessageCount = ({to, count}) => {
      setUnReadMsg(prev => ({...prev, [to]: count}));
    };

    socket.on('notification', handleNotification);
    socket.on('unreadMessageCount', handleUnreadMessageCount);

    socket.on('getRequest', data => {
      setnewRequest(!newRequest);
    });

    return () => {
      socket.off('notification', handleNotification);
      socket.off('unreadMessageCount', handleUnreadMessageCount);
    };
  }, [socket]);

  useEffect(() => {
    const subscription = eventEmitter.addListener('notificationPressed', () => {
      props.navigation.navigate('ChatBody');
    });
    // return () => {
    //   subscription.remove(); // Clean up listener on component unmount
    // };
  }, []);

  const Chats = () => (
    <View>
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

        {loading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // flexGrow: 1,
              // height: '100%',
            }}>
            <ActivityIndicator size="large" color="#FFC901" />
          </View>
        ) : (
          <>
            {chats.length > 0 ? (
              <View>
                {chats.map((item, i) => {
                  const unreadCount =
                    unReadMsg[item?.recentMessage?.receiverId];
                  return (
                    <View key={i}>
                      <TouchableOpacity
                        onPress={() => {
                          socket.emit(
                            'markMessagesAsRead',
                            item?.recentMessage?.receiverId,
                          );
                          const ids = [userId, item._id].sort().join('_');
                          const roomID = `chatRoom_${ids}`;
                          props.navigation.navigate('ChatRoom', {
                            name: item.name,
                            receiverId: item._id,
                            email: item.email,
                            roomID,
                          });
                        }}>
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
                                {item.name}
                              </Text>
                              {unreadCount > 0 && (
                                <Badge
                                  label={unreadCount}
                                  style={{alignSelf: 'flex-start', top: 5}}
                                  color="#FFC901"
                                />
                              )}
                            </View>
                            <View>
                              <Text
                                numberOfLines={1}
                                style={{
                                  color: '#fff',
                                  fontSize: 16,
                                  fontFamily: 'Poppins-SemiBold',
                                  width: 200,
                                }}>
                                {item?.recentMessage?.messages}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              height: 50,
                              width: 50,
                            }}>
                            <Avatar
                              rounded
                              source={require('../../../assets/images/user1.png')}
                              size="small"
                              containerStyle={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                              }}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '85%',
                }}>
                <View
                  style={{
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 50,
                    width: '100%',
                  }}>
                  <FastImage
                    style={{width: 200, height: 200}}
                    source={require('../../../assets/images/nochats.gif')}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text style={{color: '#fff', fontSize: 22}}>
                    No chats Found!!!
                  </Text>
                </View>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );

  const Requests = () => (
    <View>
      <View style={{padding: 10}}>
        <View style={{padding: chatBody.Padding, flexDirection: 'row'}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 25,
              fontFamily: 'Poppins-Bold',
            }}>
            Requests
          </Text>
          <Badge
            label={
              <Text
                style={{
                  color: 'white',
                }}>
                {requests?.data?.length}
              </Text>
            }
            style={{
              alignSelf: 'flex-start',
              top: 10,
              marginLeft: 10,
              color: 'white',
            }}
            color="#D75D5D"
          />
        </View>

        <View style={chatBody.usersStyle}>
          {requests?.data?.length > 0 ? (
            <View>
              {requests?.data?.map((item, i) => {
                return (
                  <View
                    key={item._id}
                    style={{
                      marginTop: 20,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
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
                          source={require('../../../assets/images/user1.png')}
                          style={{width: 50, height: 50}}
                        />
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: '#f3f3f3',
                            fontFamily: 'Poppins-Bold',
                            fontSize: 20,
                            marginLeft: 10,
                          }}>
                          {item?.from?.name}
                        </Text>
                      </View>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TouchableOpacity
                        onPress={() => {
                          acceptrequest(
                            item?.from?._id,
                            item?.from?.name,
                            item?.from?.email,
                          );
                        }}>
                        <View
                          style={{
                            backgroundColor: '#FFC901',
                            // padding: 6,
                            paddingHorizontal: 15,
                            paddingVertical: 7,
                            borderRadius: 16,
                          }}>
                          <Text style={{color: '#000', fontWeight: '600'}}>
                            Confirm
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => deleteRequest(item.from)}
                        // onPress={() =>
                        //   Alert.alert('Alert', 'Request removed successfully!!')
                        // }
                      >
                        <View style={{marginLeft: 20, marginRight: 10}}>
                          <Cancel
                            name={'cancel'}
                            size={30}
                            color={'#888'}
                            // onPress={() => deleteRequest()}
                          />
                        </View>
                      </TouchableOpacity>
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
                  // backgroundColor: '#4E4C4C',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 50,

                  // padding: 0,
                  width: '100%',
                  // borderColor: '#FFC901',
                  // borderWidth: 1,
                }}>
                <FastImage
                  style={{width: 250, height: 200}}
                  source={require('../../../assets/images/nomsg.gif')}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{color: '#fff', fontSize: 22}}>
                  No Requests Found!!!
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
  const Peoples = () => (
    <View>
      <View style={{padding: 10}}>
        <View style={{padding: chatBody.Padding, flexDirection: 'row'}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 25,
              fontFamily: 'Poppins-Bold',
            }}>
            Peoples
          </Text>
        </View>

        <View style={chatBody.usersStyle}>
          {userData.length > 0 ? (
            <View>
              {userData.map((item, i) => {
                return (
                  <View key={item._id}>
                    <View
                      style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          // justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
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
                            source={require('../../../assets/images/user1.png')}
                            style={{width: 50, height: 50}}
                          />
                        </View>

                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              color: '#f3f3f3',
                              fontFamily: 'Poppins-Bold',
                              fontSize: 20,
                              marginLeft: 10,
                            }}>
                            {item?.name}
                          </Text>
                        </View>
                      </View>
                      {existUserId.includes(item._id) ? (
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TouchableOpacity
                            onPress={() => {
                              // setIndex(1);
                              props.navigation.navigate('ChatScreen', {
                                receiverId: item._id,
                                name: item?.name,
                                email: item?.email,
                              });
                            }}>
                            <View
                              style={{
                                marginLeft: 20,
                                marginRight: 10,
                                backgroundColor: '#61511F',
                                borderRadius: 10,
                                padding: 5,
                              }}>
                              <Entypo
                                name={'plus'}
                                size={25}
                                color={'#FFC901'}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TouchableOpacity
                            onPress={() => {
                              // setIndex(1);
                              props.navigation.navigate('ChatRoom', {
                                receiverId: item._id,
                                name: item?.name,
                                email: item?.email,
                              });
                            }}>
                            <View
                              style={{
                                marginLeft: 20,
                                marginRight: 10,
                                backgroundColor: '#FFC901',
                                borderRadius: 10,
                                padding: 6,
                              }}>
                              <Text style={{fontSize: 18, color: '#000'}}>
                                Chat
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
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
                  // backgroundColor: '#4E4C4C',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 50,

                  // padding: 0,
                  width: '100%',
                  // borderColor: '#FFC901',
                  // borderWidth: 1,
                }}>
                {/* <Text
                style={{
                  color: '#fff',
                  fontSize: 25,
                }}>
                No requests found!!☺️
              </Text> */}
                <FastImage
                  style={{width: 120, height: 170}}
                  source={require('../../../assets/images/notfound.gif')}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{color: '#fff', fontSize: 22}}>
                  No Peoples Found!!!
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  const renderScene = SceneMap({
    first: Chats,
    second: Requests,
    third: Peoples,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      renderLabel={({route, focused, color}) => (
        <View style={styles.tabItem}>
          <View
            style={[
              styles.iconContainer,
              focused ? styles.iconContainerFocused : {},
            ]}>
            {/* <Text>
              {route.key === 'second' && (
                <Badge count={5} style={styles.badge} />
              )}
            </Text> */}
            <Icon
              name={
                route.key === 'first'
                  ? 'chat-processing'
                  : route.key === 'second'
                  ? 'account-plus'
                  : 'account-group'
              }
              size={24}
              color={focused ? '#FFC901' : '#888'}
            />
          </View>
          <Text
            style={{
              color: focused ? '#fff' : '#f3f3f3',
              marginTop: 4,
              opacity: focused ? 0.9 : 0.6,
            }}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    {key: 'third', title: 'Peoples'},
    {key: 'first', title: 'Chats'},
    {key: 'second', title: 'Request'},
  ]);

  const navigation = useNavigation();

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
  const {userId, setToken} = useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const [userData, setUserData] = useState([]);
  const [chats, setChats] = useState([]);
  // const [userId, setUserId] = useState(AsyncStorage.getItem('authToken'));

  useEffect(() => {
    if (userId) {
      getAllUserData();
      getUserData();
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      if (newMessage) {
        getUserData();
      }
    }, [newMessage]),
  );

  const getAllUserData = async () => {
    try {
      const {data} = await axios.get(BASE_URL + `/auth/users/${userId}`);

      setUserData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [loading, setLoading] = useState(true); // Start with loading as true

  const getUserData = async (initial = false) => {
    if (initial) {
      setLoading(true);
    }

    try {
      const response = await axios.get(BASE_URL + `/auth/user/${userId}`);
      console.log(response.data, 'chatsList');
      setChats(response.data);
      if (initial) {
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Delay for 2 seconds
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('Error fetching user', error);
      // throw error;
    }
  };

  const navigations = useNavigation();

  const Logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    try {
      setToken('');

      navigations.replace('Login');
    } catch (error) {
      console.log('Error removing auth token:', error);
    }
  };
  const [requests, setrequests] = useState([]);
  useEffect(() => {
    if (userId) {
      getRequest();
    }
  }, [userId, newRequest]);

  useEffect(() => {
    socket.on('getRequest', data => {
      setnewRequest(!newRequest);
    });
    if (newRequest) {
      showRequests('LetsChat', 'New Request Found');
    }
    getRequest();
  }, [newRequest]);

  useEffect(() => {
    getRequest();
  }, []);

  const deleteRequest = async sender => {
    try {
      const userData = {
        data: {
          senderId: sender._id,
          receiverId: userId,
        },
      };

      const response = await axios.delete(
        BASE_URL + '/auth/deleterequest',
        userData,
      );

      socket.emit('deleteSenderRequest', {
        userData,
      });

      if (response.status == 200) {
        getRequest();
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Your request canceled 😥',
          button: 'close',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRequest = async () => {
    try {
      const {data} = await axios.get(BASE_URL + `/auth/getrequests/${userId}`);
      // console.log(JSON.stringify(data, null, 2), 'dataid');
      setrequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [requestAccepted, setRequestAccepted] = useState(false);

  useEffect(() => {
    if (!socket) return;
    socket.on('requestAcceptedFromReceiver', data => {
      console.log(data, 'receivedfrom');

      if (data) {
        setRequestAccepted(true);
        props.navigation.navigate('ChatBody');
        setIndex(1);
      }
    });
  }, [newRequest]);

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, [requestAccepted]),
  );

  const acceptrequest = async (requestId, name, email) => {
    try {
      const response = await axios.post(BASE_URL + '/auth/acceptrequest', {
        userId: userId,
        requestId: requestId,
      });
      if (response.status == 200) {
        socket.emit('requestAccepted', {
          userId: userId,
          requestId: requestId,
        });
        setTimeout(() => {
          getUserData();
        }, 2000);
        await getRequest();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (userData?.length > 0) {
        const existUser = userData
          ?.filter(user => !chats?.some(chat => chat._id == user._id))
          .map(user => user._id);

        setExistUserId(existUser);
      }
    }, [userData, chats]),
    // console.log(existUserId, 'existUserIds'),
  );

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <MenuProvider style={chatBody.chatScreenlayout}>
          <AlertNotificationRoot>
            <View style={chatBody.Container}>
              <View
                style={{borderBottomWidth: 1, borderBottomColor: '#f3f3f3'}}>
                <View style={chatBody.headerStyle}>
                  <Image
                    source={require('../../../assets/images/chatHeader.png')}
                    // style={{height: 60, width: 60}}
                  />

                  <Menu>
                    <MenuTrigger>
                      <Entypo
                        name="dots-three-vertical"
                        color="#F3F3F3"
                        size={23}
                      />
                    </MenuTrigger>
                    <MenuOptions
                      customStyles={{
                        optionsContainer: {
                          width: 100,
                          paddingLeft: 10,
                          backgroundColor: '#aaa07c',
                          paddingVertical: 10,
                        },
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          Logout();
                          SocketRemoveActiveUser(userId);
                          AsyncStorage.removeItem('authToken');
                        }}
                        style={{padding: 4}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingRight: 10,
                          }}>
                          <LogoutIcon color="#000" size={14} name="logout" />
                          <Text style={{color: '#000', fontWeight: 500}}>
                            Logout
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={{padding: 4}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingRight: 10,
                          }}>
                          <ProfileIcon
                            color="#000"
                            size={14}
                            name="user-circle"
                          />
                          <Text style={{color: '#000', fontWeight: 500}}>
                            Profile
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </MenuOptions>
                  </Menu>
                </View>
              </View>

              <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
                tabBarPosition="bottom"
                renderTabBar={renderTabBar}
              />
            </View>
          </AlertNotificationRoot>
        </MenuProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChatBody;
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#2C2929', // Change this to the desired background color
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopColor: '#f3f3f3',
    borderTopWidth: 0.5,
  },
  indicator: {
    backgroundColor: '#000', // Change this to the desired indicator color
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 16,
    // backgroundColor: '#C1C0C0', // Default background color for icon
  },
  iconContainerFocused: {
    backgroundColor: '#61511F', // Background color when the tab is focused
  },
  badge: {
    position: 'absolute',
    top: -10, // Adjust the position as needed
    right: -10, // Adjust the position as needed
  },
  badgeContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    bottom: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
