import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {createContext} from 'react';
import io from 'socket.io-client';
import {AuthContext} from './AuthContext';
import {BASE_URL} from './utils/API';

const SocketContext = createContext();
export const userSocketContext = () => {
  return useContext(SocketContext);
};

const SocketContextProvider = ({children}) => {
  const [socket, setSocket] = useState();
  const {authUser, userId} = useContext(AuthContext);

  const socketio = io(BASE_URL, {
    query: {
      userId: userId,
    },
    path: '/mySocket',
  });
  useEffect(() => {
    if (userId) {
      setSocket(socketio);
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, []);

  return (
    <SocketContext.Provider value={(socket, setSocket)}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
