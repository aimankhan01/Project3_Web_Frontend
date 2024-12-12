import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const { width } = Dimensions.get('window');

export default function AdminPage() {
  const navigation = useNavigation(); 

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user'); 
      navigation.reset({
        index: 0,
        routes: [{ name: 'LogIn' }], // Redirect to the login page
      });
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Something went wrong during logout. Please try again.');
    }
  };
  return (
    <View style={styles.container}>
      {/* App Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/FRESHLIST (3).png')} style={styles.logoImage} />
      </View>

      {/* Grid Boxes */}
      <View style={styles.boxContainer}>
        {/* Users Management */}
        <TouchableOpacity
          style={[styles.box, { backgroundColor: '#004725' }]}
          onPress={() => navigation.navigate('UserAdmin')} // Navigate to UserAdmin page
        >
          <Icon name="account-multiple" size={40} color="#fff" />
          <Text style={styles.boxTitle}>Users</Text>
        </TouchableOpacity>

        {/* Orders Management */}
        <TouchableOpacity style={[styles.box, { backgroundColor: '#3a7f5a' }]}>
          <Icon name="cart-outline" size={40} color="#fff" />
          <Text style={styles.boxTitle}>Orders</Text>
        </TouchableOpacity>

        {/* Products Management */}
        <TouchableOpacity style={[styles.box, { backgroundColor: '#004725' }]}
          onPress={() => navigation.navigate('ProductsAdmin')} 
        >
          <Icon name="package-variant" size={40} color="#fff" />
          <Text style={styles.boxTitle}>Products</Text>
        </TouchableOpacity>

        {/* Shops Management */}
        <TouchableOpacity style={[styles.box, { backgroundColor: '#3a7f5a' }]}
          onPress={() => navigation.navigate('ShopAdmin')} 
        >
          <Icon name="storefront-outline" size={40} color="#fff" />
          <Text style={styles.boxTitle}>Shops</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 0,
  },
  logoImage: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight:"50px",
    marginLeft:"50px"
  },
  box: {
    width: width * 0.18,
    height: width * 0.18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  boxTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#004725',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});