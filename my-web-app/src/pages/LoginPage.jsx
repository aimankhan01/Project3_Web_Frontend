import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Snackbar, Alert } from '@mui/material'; // Import Snackbar and Alert from Material-UI
import { useUser } from '../../UserContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  const { setUser } = useUser();
  const navigation = useNavigation();

  

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showSnackbar('Please fill in both email and password.', 'error');
      return;
    }
  
    try {
      const response = await fetch('https://group17-a58cc073b33a.herokuapp.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const userObject = await response.json();
  
        // Ensure the user object contains id and is stored correctly
        await AsyncStorage.removeItem('user');
        await AsyncStorage.setItem('user', JSON.stringify(userObject));
        console.log('Stored user:', userObject);

  
        setUser(userObject); // Updating context
  
        const welcomeMessage = `Welcome back, ${userObject.name}!`;
        const adminMessage = `Welcome Admin, ${userObject.name}!`;
  
        showSnackbar(userObject.role === 'true' ? adminMessage : welcomeMessage, 'success');
  
        navigation.reset({
          index: 0,
          routes: [{ name: userObject.role === 'true' ? 'AdminPage' : 'Homepage' }],
        });
      } else {
        const errorMessage = await response.text();
        showSnackbar(errorMessage || 'Login failed. Please check your credentials.', 'error');
      }
    } catch (error) {
      console.error('Error during login:', error);
      showSnackbar('Something went wrong during login. Please try again.', 'error');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ImageBackground source={require('../assets/leaf.jpg')} style={styles.container} resizeMode="cover">
      <View style={styles.glassEffect}>
        {/* Logo Image */}
        <Image source={require('../assets/logo.png')} style={styles.logoImage} />

        <Text style={styles.emailtext}>Email ID</Text>
        <TextInput
          style={styles.input}
          placeholder="username@gmail.com"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.emailtext}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
            <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="rgba(255, 255, 255, 0.7)" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logInButton} onPress={handleLogin}>
          <Text style={styles.signInText}>LOG IN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.registerText}>
            Don't have an account yet? <Text style={styles.registerLink}>Register for free</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#035c03',
  },
  glassEffect: {
    width: '30%',
    height: 'auto',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(1, 80, 1, 0.1)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    position: 'relative',
  },
  homeIconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  logoImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
    marginTop: -50,
  },
  emailtext: {
    fontSize: 15,
    color: 'white',
    marginLeft: -180,
  },
  input: {
    width: '60%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: 'white',
    marginVertical: 10,
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginVertical: 5,
    marginLeft: '130px',
    marginBottom: '20px',
  },
  logInButton: {
    width: '50%',
    backgroundColor: '#004725',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
  },
  registerText: {
    color: 'white',
    fontSize: 12,
    marginTop: 20,
  },
  registerLink: {
    color: 'black',
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    marginVertical: 10,
  },
  eyeIcon: {
    marginLeft: -40,
    padding: 10,
  },
  adminButton: {
    width: '50%',
    backgroundColor: '#d9534f', // Different color to differentiate admin login
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 10,
  },

  snackbar: {
    position: 'absolute',
    bottom: 10, // Adjusted to be near the bottom
    left: 10, // Leftmost corner alignment
    width: 'auto',
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 5, // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'flex-start',
  },
  successSnackbar: {
    backgroundColor: '#4caf50', // Green for success
  },
  errorSnackbar: {
    backgroundColor: '#f44336', // Red for errors
  },
});