import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homepage from './assets/pages/Homepage';
import Searchpage from './assets/pages/Searchpage';
import Cart from './assets/pages/ShoppingCart'; 
import CategoryPage from './assets/pages/Catagories';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
    
      <Drawer.Navigator 
        initialRouteName="Home" 
        screenOptions={{
          swipeEnabled: true, 
          gestureEnabled: true, 
          headerShown: false, 
        }}
      >
          <Drawer.Screen name="Home" component={Homepage} />
          <Drawer.Screen name="Search" component={Searchpage} />
            <Drawer.Screen name="Cart" component={Cart} />
            <Drawer.Screen name="Catagory" component={CategoryPage} />

          {/* You can add more screens here as needed */}
        </Drawer.Navigator>

        <StatusBar style="auto" />
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
