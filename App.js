import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homepage from './assets/pages/Homepage'; 

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <LinearGradient
        colors={['#2fe97f', '#56ab2f']} 
        style={styles.container}
      >
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Homepage} />
          {/* You can add more screens here as needed */}
        </Drawer.Navigator>
        <StatusBar style="auto" />
      </LinearGradient>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
