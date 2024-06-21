import {StyleSheet, View, Text, TextInput} from 'react-native';

import {PaperProvider} from 'react-native-paper';
import Login from './components/Login/login';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SignIn from './components/signIn/signIn';

import ChatBody from './components/chatPage/chatBody/chatBody';
import ChatScreen from './components/chatPage/chatScreen/RequestScreen';
import ChatScreenHeader from './components/chatPage/chatScreen/chatScreenHeader/chatScreenHeader';
import {AuthProvider} from './AuthContext';
import SocketContextProvider from './SocketContext';
import ChatRoom from './components/chatPage/chatScreen/chatRoom';
import {AlertNotificationRoot} from 'react-native-alert-notification';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthProvider>
          <AlertNotificationRoot>
            <SocketContextProvider>
              <Stack.Navigator
                screenOptions={{
                  ...TransitionPresets.SlideFromRightIOS,
                  transitionSpec: {
                    open: {
                      animation: 'timing',
                      config: {
                        duration: 400,
                      },
                    },
                    close: {
                      animation: 'timing',
                      config: {
                        duration: 400,
                      },
                    },
                  },
                }}>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="ChatBody"
                  component={ChatBody}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="ChatScreen"
                  component={ChatScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="ChatRoom"
                  component={ChatRoom}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            </SocketContextProvider>
          </AlertNotificationRoot>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
