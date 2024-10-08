import {createContext, useContext, useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {BASE_URL} from './utils/API';
import {AuthContext} from './AuthContext';

const SocketContext = createContext(null);
export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const {userId} = useContext(AuthContext);
  const [activeUsers, setactiveUsers] = useState([]);
  const [isActive, setisActive] = useState(false);
  useEffect(() => {
    const connection = io(BASE_URL, {
      query: {
        userId: userId,
      },
      path: '/mySocket',
    });
    setSocket(connection);
    connection.on('activeUsers', data => {
      // setactiveUsers(data);
      // console.log(data, 'fromsocket');
      setisActive(!isActive);

      if (activeUsers.length == 0) {
        setactiveUsers(data);
      }
    });
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);
  const SocketIsActiveUser = data => {
    console.log(data, 'activeruser called');
    socket.emit('me', data);
    socket.emit('activeUsers', data);
  };
  const SocketRemoveActiveUser = data => {
    console.log(data, 'remove called');
    socket.emit('removeUser', data);
  };
  // socket?.on('connect_error', async (err) => {
  //   console.log("Error establishing socket", err)
  //   await fetch('/api/socket')
  // })

  return (
    <SocketContext.Provider
      value={{
        socket,
        SocketIsActiveUser,
        activeUsers,
        SocketRemoveActiveUser,
        isActive,
      }}>
      {children}
    </SocketContext.Provider>
  );
};
