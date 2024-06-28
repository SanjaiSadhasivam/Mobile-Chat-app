import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {BASE_URL} from './API';
import {showNotification} from '../src/notification.android';
import {AuthContext} from '../AuthContext';

export default function useSocketIO(userId, scrollViewRef, roomid) {
  const [socket, setsocket] = useState(null);
  const [message, setMessage] = useState([]);
  // const [activeUsers, setactiveUsers] = useState([]);
  // const {userId} = useContext(AuthContext);

  useEffect(() => {
    if (!socket) {
      const socketio = io(BASE_URL, {
        query: {
          userId: userId,
        },
        path: '/mySocket',
      });

      socketio.emit('me', userId);
      socketio.emit('join', roomid);
      setsocket(socketio);
      socketio.on('newMessage', newMessage => {
        newMessage.shouldShake = true;
        setMessage(prevMessages => [...prevMessages, newMessage]);
        // showNotification('LetsChat', newMessage.messages);
        scrollViewRef.current?.scrollToEnd({animated: true});
      });
      // console.log('testtsss');
      socketio.on('notification', newMessages => {
        console.log('newMessage');
        showNotification('LetsChat', newMessages);
      });
      // socketio.on('activeUsers', users => {
      //   console.log(users, 'socket');
      //   setactiveUsers(users);
      // });
    }

    return () => {
      if (socket) {
        socket.close();
        socket.off('newMessage');
        socket.off('notification');
      }
    };
  }, []);

  return {socket, message, setMessage};
}
