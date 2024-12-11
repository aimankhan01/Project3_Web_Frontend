import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCartItems = storedCartItems.map((item) => ({
      ...item,
      quantity: item.quantity ? parseInt(item.quantity, 10) : 1, // Default quantity to 1 if missing or invalid
    }));
    setCartItems(updatedCartItems);
    calculateTotal(updatedCartItems);
  }, []);

  const calculateTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      const price = parseFloat(item.price);
      const quantity = item.quantity ? parseInt(item.quantity, 10) : 1; // Default to 1 if quantity is missing
      if (!isNaN(price) && isFinite(price) && quantity > 0) {
        total += price * quantity;
      }
    });
    setTotal(total);
  };

  const updateQuantity = (productID, delta) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.productID === productID) {
        const currentQuantity = item.quantity ? parseInt(item.quantity, 10) : 1; // Ensure quantity is a number
        const newQuantity = currentQuantity + delta;
        return { ...item, quantity: Math.max(newQuantity, 1) }; // Quantity should be at least 1
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    calculateTotal(updatedCartItems);
  };

  const deleteItem = (productID) => {
    const updatedCartItems = cartItems.filter(item => item.productID !== productID);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    calculateTotal(updatedCartItems);
  };

  const proceedToCheckout = () => {
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000); // Automatically hide after 3 seconds
    navigation.navigate('Checkout');
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
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item.productID, -1)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.productID, 1)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.itemPrice}>${parseFloat(item.price).toFixed(2)}</Text>
              <TouchableOpacity onPress={() => deleteItem(item.productID)} style={styles.deleteButton}>
                <FontAwesome name="trash" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={proceedToCheckout}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'x',
          onPress: () => setSnackbarVisible(false),
        }}
        style={styles.snackbar}
        theme={{ colors: { accent: '#388E3C' } }}
      >
        Checkout Successful!
      </Snackbar>
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
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  itemDetails: {
    flex: 2,
    paddingRight: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#ddd',
    borderRadius: 4,
    textAlign: 'center',
    marginHorizontal: 4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#388E3C',
  },
  deleteButton: {
    marginTop: 8,
    padding: 6,
    borderRadius: 3,
  },
  totalContainer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
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
  snackbar: {
    backgroundColor: 'transparent',
    color: 'green',
  },
});

export default Cart;
