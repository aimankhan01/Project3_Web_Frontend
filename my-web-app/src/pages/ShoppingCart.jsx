import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const Cart = ({ navigation, route }) => {
  const [cartItems, setCartItems] = useState(route.params?.cartItems || []);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal(cartItems);
  }, [cartItems]);

  const calculateTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      const price = parseFloat(item.price);
      const quantity = item.quantity ? parseInt(item.quantity, 10) : 1;
      if (!isNaN(price) && isFinite(price) && quantity > 0) {
        total += price * quantity;
      }
    });
    setTotal(total);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

       <Text style={styles.headerTitle}>Shopping Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productID.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${parseFloat(item.price).toFixed(2)}</Text>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#388E3C',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388E3C',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#388E3C',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#555',
  },
  totalContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',
  },
  checkoutButton: {
    padding: 12,
    backgroundColor: '#388E3C',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
