import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {createContext} from 'react';
import io from 'socket.io-client';
import {AuthContext} from './AuthContext';

const SocketContext = createContext();
export const userSocketContext = () => {
  return useContext(SocketContext);
};

const SocketContextProvider = ({children}) => {
  const [socket, setSocket] = useState();
  const {authUser, userId} = useContext(AuthContext);

  const socketio = io('http://10.60.36.78:4000', {
    query: {
      userId: userId,
    },
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
