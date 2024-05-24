import React from 'react';
import {SafeAreaView} from 'react-native';
import Login from '../components/Login/login';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

export default function Navigator() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
