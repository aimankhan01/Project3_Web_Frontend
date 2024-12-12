import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const Cart = ({ cart, navigation }) => {
  const [cartItems, setCartItems] = useState(cart || []); // Use cart passed as a prop
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal(cartItems);
  }, [cartItems]);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1),
      0
    );
    setTotal(total);
  };

  const removeItem = (productID) => {
  const itemToRemove = cartItems.find((item) => item.productID === productID);
  if (itemToRemove) {
    console.log(`Removing item: ${itemToRemove.name}, ID: ${itemToRemove.productID}`);
  }
    const updatedCart = cartItems.filter((item) => item.productID !== productID);
    setCartItems(updatedCart);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty!</Text>
        </View>
      ) : (
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
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(item.productID)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() =>
          navigation.navigate('Checkout', { cartItems: cartItems, total: total })
        }
      >
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
  removeButton: {
    padding: 8,
    backgroundColor: '#D32F2F',
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
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
