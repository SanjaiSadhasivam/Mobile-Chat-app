import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  StyleSheet,
  SectionList,
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
import FastImage from 'react-native-fast-image';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons'; // Import Delete icon
import {Button, Modal, Portal, Provider} from 'react-native-paper';
import DeleteModel from '../../deleteModel/deleteModel';
import {getTime, groupMessagesByDate} from '../../messageHelper/messageHelper';

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
    setSending(true);
    try {
      if (messages.trim() !== '') {
        // await axios.post(BASE_URL + '/auth/sendMessage', {
        //   senderId,
        //   receiverId,
        //   messages,
        // });
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
    } finally {
      setSending(false);
    }
  };

  const [loading, setLoading] = useState(true); // Start with loading as true
  const [sending, setSending] = useState(false); // New state for sending messages
  const fetchMessages = async (initial = false) => {
    if (initial) {
      setLoading(true);
    }

    try {
      const senderId = userId;
      const receiverId = props.route.params.receiverId;
      const response = await axios.get(BASE_URL + '/auth/messages', {
        params: {senderId, receiverId},
      });
      setMessage(response.data);
      if (initial) {
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Delay for 2 seconds
      } else {
        setLoading(false);
      }
      // scrollViewRef.current?.scrollToEnd({animated: true});
    } catch (error) {
      console.log(error);
      if (initial) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + formattedMinutes + ' ' + ampm;
  };

  // useEffect(() => {
  //   if (message) {
  //     fetchMessages();
  //   }
  // }, [message]);

  const [selectedMessages, setSelectedMessages] = useState([]);
  const handleLongPress = item => {
    if (selectedMessages.includes(item)) {
      setSelectedMessages(
        selectedMessages.filter(selectedItem => selectedItem !== item),
      );
    } else {
      setSelectedMessages([...selectedMessages, item]);
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on('messagesDeleted', data => {
      fetchMessages();
    });
  }, [message]);

  const deleteSelectedMessages = async () => {
    const messageIds = selectedMessages.map(msg => msg._id);

    try {
      const messageDelete = await axios.delete(
        `${BASE_URL}/auth/deleteMessages`,
        {
          data: {messageIds},
        },
      );
      socket.emit('deleteMessage', {messageIds, roomID});
      const newMessages = message.filter(
        msg => !selectedMessages.includes(msg),
      );
      fetchMessages();
      setMessage(newMessages);

      setSelectedMessages([]);
    } catch (error) {
      console.log(error);
    }
  };

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const groupedMessages = groupMessagesByDate(message);
  const [listViewHeight, setListViewHeight] = useState(undefined);

  return (
    <View style={{flexGrow: 1}}>
      <ChatScreenHeader props={props} chatName={props.route.params.name} />
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#2C2929'}}>
        {/* <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({animated: true})
          }
          contentContainerStyle={{
            flexGrow: 1,
            // justifyContent: 'flex-end',
          }}> */}
        <View>
          {loading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
                height: '100%',
              }}>
              <ActivityIndicator size="10px" color="#FFC901" />
            </View>
          ) : groupedMessages.length > 0 ? (
            <SectionList
              stickySectionHeadersEnabled
              ref={scrollViewRef}
              onLayout={event => {
                setListViewHeight(event.nativeEvent.layout.height);
              }}
              onContentSizeChange={(w, h) => {
                scrollViewRef?.current?.getScrollResponder()?.scrollTo({
                  y: h - listViewHeight,
                });
              }}
              contentContainerStyle={{
                justifyContent: 'flex-end',
                paddingBottom: 0,
                flexGrow: 1,
                padding: 10,
              }}
              scrollEnabled
              sections={groupedMessages}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => {
                const isSender = item?.senderId?._id == userId;
                const isSelected = selectedMessages.includes(item);
                return (
                  <TouchableOpacity
                    onLongPress={() => handleLongPress(item)}
                    style={[styles.item, isSelected && styles.selectedItem]}>
                    <View
                      style={{
                        alignItems: !isSender ? 'flex-start' : 'flex-end',
                      }}>
                      <View
                        style={
                          isSender
                            ? chatScreen.chatScreenSender
                            : chatScreen.chatScreenReceiver
                        }>
                        <Text style={chatScreen.chatScreenText}>
                          {item.messages}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            paddingLeft: 15,
                            paddingRight: 15,
                            paddingBottom: 10,
                            color: '#fff',
                          }}>
                          {formatTimestamp(item.timeStamp)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              renderSectionHeader={({section: {title}}) => (
                <View style={{alignItems: 'center'}}>
                  <Text style={[styles.dateHeader, styles.Header]}>
                    {title}
                  </Text>
                </View>
              )}
            />
          ) : (
            // <View style={chatScreen.Container}>
            //   {groupedMessages.map((group, groupIndex) => (
            //     <View key={groupIndex}>
            //       <View style={{alignItems: 'center'}}>
            //         <Text style={[styles.dateHeader, styles.Header]}>
            //           {group.title}
            //         </Text>
            //       </View>
            //       {group.data.map((item, index) => {
            //         const isSender = item?.senderId?._id == userId;
            //         const isSelected = selectedMessages.includes(item);
            //         return (
            //           <TouchableOpacity
            //             key={index}
            //             onLongPress={() => handleLongPress(item)}
            //             style={[
            //               styles.item,
            //               isSelected && styles.selectedItem,
            //             ]}>
            //             <View
            //               style={{
            //                 alignItems: !isSender ? 'flex-start' : 'flex-end',
            //               }}
            //               key={index}>
            //               <View
            //                 style={
            //                   isSender
            //                     ? chatScreen.chatScreenSender
            //                     : chatScreen.chatScreenReceiver
            //                 }>
            //                 <Text style={chatScreen.chatScreenText}>
            //                   {item.messages}
            //                 </Text>
            //                 <Text
            //                   style={{
            //                     fontSize: 12,
            //                     paddingLeft: 15,
            //                     paddingRight: 15,
            //                     paddingBottom: 10,
            //                     color: '#fff',
            //                   }}>
            //                   {formatTimestamp(item.timeStamp)}
            //                 </Text>
            //               </View>
            //             </View>
            //           </TouchableOpacity>
            //         );
            //       })}
            //     </View>
            //   ))}
            // </View>
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
                  source={require('../../../assets/images/nomsg1.gif')}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{color: '#fff', fontSize: 22}}>
                  No Messages Found!!!
                </Text>
              </View>
            </View>
          )}
        </View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>

      {selectedMessages.length > 0 && (
        <TouchableOpacity
          style={styles.deleteIcon}
          // onPress={deleteSelectedMessages}
          onPress={showModal}>
          <DeleteIcon name="delete" size={30} color="#F3F3F3" />
        </TouchableOpacity>
      )}
      {visible && (
        <DeleteModel
          showModal={showModal}
          hideModal={hideModal}
          visible={visible}
          deleteSelectedMessages={deleteSelectedMessages}
        />
      )}

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
const styles = StyleSheet.create({
  Header: {
    color: '#f3f3f3',
    opacity: 0.6,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#61511F',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },

  selectedItem: {
    backgroundColor: '#61511F',
    opacity: 0.3,
  },

  deleteIcon: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#FFC901',
    padding: 10,
    borderRadius: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#333333',
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#555555',
    borderRadius: 30,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#FFC901',
    padding: 10,
    borderRadius: 30,
  },
});

export default ChatRoom;
