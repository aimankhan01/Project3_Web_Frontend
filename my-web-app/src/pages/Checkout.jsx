import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = ({ route, navigation }) => {
  const { cartItems, total, setCart } = route.params; // Receive cart data and total amount




  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert('Error: Your cart is empty!');
    } else {
      alert('Success: Order placed successfully!');
  
      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        total,
        items: cartItems,
      };
  
      try {
        const existingOrders = await AsyncStorage.getItem('orders');
        const orders = existingOrders ? JSON.parse(existingOrders) : [];
        orders.push(newOrder);
        await AsyncStorage.setItem('orders', JSON.stringify(orders));
        
        navigation.navigate('Homepage');
      } catch (error) {
        console.error('Error saving order:', error);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      <Text style={styles.total}>Total Amount: ${total.toFixed(2)}</Text>

      <Text style={styles.itemsTitle}>Items:</Text>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <View key={item.productID} style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>
              Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}

      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#388E3C',
    textAlign: 'center',
    marginBottom: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#555',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  placeOrderButton: {
    padding: 12,
    backgroundColor: '#388E3C',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Checkout;
