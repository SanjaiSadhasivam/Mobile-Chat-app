import React, {useEffect, useCallback, useState, useContext} from 'react';

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
import Cancel from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatBody = props => {
  const layout = useWindowDimensions();
  const route = useRoute();

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
        {chats.length > 0 ? (
          <View>
            {chats.map((item, i) => {
              return (
                <View key={i}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('ChatRoom', {
                        name: item.name,
                        receiverId: item._id,
                      })
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
                            {item.name}
                          </Text>
                          <Badge
                            label="1"
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
                            sasa
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
                          source={require('../../../assets/images/user1.png')}
                          style={{width: 50, height: 50}}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        ) : (
          <Text style={{color: '#fff'}}>No chats Available</Text>
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
          {requests?.data?.length > 0 &&
            requests?.data?.map((item, i) => {
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
                          {item?.from?.name}
                        </Text>
                      </View>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TouchableOpacity
                        onPress={() => {
                          acceptrequest(item?.from?._id);
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
                        onPress={() =>
                          Alert.alert('Alert', 'Request removed successfully!!')
                        }>
                        <View style={{marginLeft: 20, marginRight: 10}}>
                          <Cancel name={'cancel'} size={30} color={'#888'} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
  const Peoples = ({navigateToSecondTab}) => (
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
          {userData.length > 0 &&
            userData.map((item, i) => {
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

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {/* <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('ChatScreen');
                          item._id;
                        }}>
                        
                      </TouchableOpacity> */}
                      <TouchableOpacity
                        // onPress={() =>
                        //   Alert.alert(
                        //     'Alert',
                        //     'Request Approved successfully!!',
                        //   )
                        // }
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
                          <Entypo name={'plus'} size={25} color={'#FFC901'} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
  // const navigateToSecondTab = () => {
  //   Alert.alert('Alert', 'Request Approved successfully!!');
  //   setIndex(1); // Change the index to 1 to navigate to the second tab
  // };
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

  const getAllUserData = async () => {
    try {
      const {data} = await axios.get(
        `http://10.60.36.78:5000/auth/users/${userId}`,
      );

      setUserData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(userData, 'userData');
  const getUserData = async () => {
    try {
      const response = await axios.get(
        `http://10.60.36.78:5000/auth/user/${userId}`,
      );

      setChats(response.data);
    } catch (error) {
      console.log('Error fetching user', error);
      throw error;
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
  }, [userId]);
  const getRequest = async () => {
    try {
      const {data} = await axios.get(
        `http://10.60.36.78:5000/auth/getrequests/${userId}`,
      );

      setrequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptrequest = async requestId => {
    try {
      const response = await axios.post(
        'http://10.60.36.78:5000/auth/acceptrequest',
        {
          userId: userId,
          requestId: requestId,
        },
      );
      if (response.status == 200) {
        props.navigation.navigate('ChatScreen');
        await getRequest();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                    <Entypo
                      name="dots-three-vertical"
                      color="#F3F3F3"
                      size={23}
                    />
                  </MenuTrigger>
                  <MenuOptions customStyles={{optionsContainer: {width: 100}}}>
                    <TouchableOpacity
                      onPress={() => {
                        Logout();
                        AsyncStorage.removeItem('authToken');
                      }}
                      style={{padding: 4}}>
                      <Text>Logout</Text>
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
});
