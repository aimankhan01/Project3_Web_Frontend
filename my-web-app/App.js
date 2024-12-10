import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/pages/LoginPage';
import SignupPage from './src/pages/SignUpPage'; 
import Homepage from './src/pages/Homepage'; 
import Categories from './src/pages/Categories'; 
import SearchPage from './src/pages/Searchpage'; 
import Cart from './src/pages/ShoppingCart'; 
import LandingPage from './src/pages/LandingPage';
import CategoryOpen from './src/pages/CategoryOpen';
import OrderDetails from './src/pages/OrderDetails';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage">
      <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }} 
        />
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
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="SearchPage"
          component={SearchPage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="CategoryOpen"
          component={CategoryOpen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}