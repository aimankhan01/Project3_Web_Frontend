import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/pages/LoginPage';
import SignupPage from './src/pages/SignUp'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen
          name="LogIn"
          component={LoginPage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="SignUp"
          component={SignupPage}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}