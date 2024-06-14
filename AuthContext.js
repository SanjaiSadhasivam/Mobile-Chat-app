import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {createContext, useEffect, useState} from 'react';
// import 'core-js/stable/atob';

const AuthContext = createContext();
const AuthProvider = ({children}) => {
  const [token, setToken] = useState('');
  const [userId, setuserId] = useState('');

  // useEffect(() => {
  const fetchUser = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const decodeToken = jwtDecode(token);
    const userId = decodeToken;

    setuserId(userId.userData._id);
  };
  // fetchUser();
  // }, []);
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{token, userId, setToken}}>
      {children}
    </AuthContext.Provider>
  );
};
export {AuthContext, AuthProvider};
