import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';  

const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();  


  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else if (!passwordStrengthRegex.test(password)) {
      setErrorMessage('Password does not meet the required criteria');
    } else {
     
      setErrorMessage('');
      console.log('Sign Up Successful');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/leaf.jpg')} 
      style={styles.container}
      resizeMode="cover" 
    >
      <View style={styles.glassEffect}>
        <Image 
          source={require('../assets/logo.png')}  // Replace with your logo path
          style={styles.logoImage}
        />
        <Text style={styles.loginText}></Text>

        <Text style={styles.emailtext}>Name</Text>
        <TextInput
          style={styles.name}
          placeholder="Your Name"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.emailtext}>Email ID</Text>
        <TextInput
          style={styles.name}
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

        <Text style={styles.confirmtext}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Confirm Password"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.eyeIcon}>
            <Icon name={confirmPasswordVisible ? 'eye-off' : 'eye'} size={24} color="rgba(255, 255, 255, 0.7)" />
          </TouchableOpacity>
        </View>

        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.logInButton} onPress={handleSignUp}>
          <Text style={styles.signInText}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
          <Text style={styles.registerText}>
            Already have an account? <Text style={styles.registerLink}>Log in</Text>
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
    backgroundColor:'#035c03',
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
  name: {
    width: '60%', 
    height: 40,   
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: 'white',
    marginVertical: 10,
    marginBottom: 15,
  },

  emailtext:{
    fontSize: 15,
    color: 'white',
    marginRight:'180px'  
  },
  confirmtext:{
    fontSize: 15,
    color: 'white',
    marginRight:'100px'  
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
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginVertical: 10,
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