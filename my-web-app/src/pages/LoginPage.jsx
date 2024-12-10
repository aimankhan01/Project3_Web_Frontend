import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/leaf.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.glassEffect}>
        {/* Home Icon */}
        <TouchableOpacity 
          style={styles.homeIconContainer} 
          onPress={() => navigation.navigate('Homepage')}
        >
          <Icon name="home" size={24} color="white" />
        </TouchableOpacity>

        {/* Logo Image */}
        <Image
          source={require('../assets/logo.png')} // Replace with your logo image file
          style={styles.logoImage}
        />
        
        <Text style={styles.loginText}></Text>

        <Text style={styles.emailtext}>Email ID</Text>
        <TextInput
          style={styles.input}
          placeholder="username@gmail.com"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.emailtext}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Icon
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="rgba(255, 255, 255, 0.7)"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logInButton}>
          <Text style={styles.signInText}>LOG IN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.registerText}>
            Don't have an account yet? <Text style={styles.registerLink}>Register for free</Text>
          </Text>
        </TouchableOpacity>
      </View>
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
    width: 250,  // Adjust the size of your logo
    height: 250,
    marginBottom: 20,
    marginTop: -50,
  },
  loginText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
    marginTop:-80,
    fontWeight: 'bold',
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
    marginTop: '-10px',
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
});