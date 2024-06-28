import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {createContext, useEffect, useState} from 'react';
// import 'core-js/stable/atob';

const AuthContext = createContext();
const AuthProvider = ({children}) => {
  const [token, setToken] = useState('');
  const [userId, setuserId] = useState('');
  const [userName, setuserName] = useState('');

  // useEffect(() => {
  const fetchUser = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const decodeToken = jwtDecode(token);
    const userId = decodeToken;
    // console.log(userId.userData.name, 'userId');
    setuserId(userId.userData._id);
    setuserName(userId.userData.name);
  };
  // fetchUser();
  // }, []);
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{token, userId, setToken, userName}}>
      {children}
    </AuthContext.Provider>
  );
};
export {AuthContext, AuthProvider};
