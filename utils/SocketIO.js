import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {BASE_URL} from './API';

export default function useSocketIO(userId, scrollViewRef, roomid) {
  const [socket, setsocket] = useState(null);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const socketio = io(BASE_URL, {
      query: {
        userId: userId,
      },
      path: '/mySocket',
    });
    if (socketio) {
      socketio.emit('join', roomid);
      setsocket(socketio);
      socketio.on('newMessage', newMessage => {
        newMessage.shouldShake = true;
        setMessage(prevMessages => [...prevMessages, newMessage]);
        scrollViewRef.current?.scrollToEnd({animated: true});
      });
    }

    return () => {
      if (socketio) {
        socketio.close();
        socketio.off('newMessage');
      }
    };
  }, []);

  return {socket, message, setMessage};
}
