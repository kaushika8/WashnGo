import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './splashScreen';
import GetStarted from './getStarted';
import SignIn from './signin';
import SignUp from './signUp';
import Logout from './logout';
const AppStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="logout" component={Logout} />
    </Stack.Navigator>
  );
};

export default AppStack;
