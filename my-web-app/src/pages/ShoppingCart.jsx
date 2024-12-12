import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [userID, setUserID] = useState(null); // Set the default state to null

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCartItems = JSON.parse(await AsyncStorage.getItem('cart')) || [];
        const updatedCartItems = storedCartItems.map((item) => ({
          ...item,
          quantity: item.quantity ? parseInt(item.quantity, 10) : 1,
        }));
        setCartItems(updatedCartItems);
        calculateTotal(updatedCartItems);
      } catch (error) {
        console.error("Error fetching cart items from async storage:", error);
      }
    };

    fetchCartItems();

    const fetchUserID = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      console.log("Stored User from AsyncStorage:", storedUser);
      const userObject = JSON.parse(storedUser);
      setUserID(userObject.userID);
    };



    fetchUserID();
  },[navigation]);

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

  const updateQuantity = async (productID, delta) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.productID === productID) {
        const currentQuantity = item.quantity ? parseInt(item.quantity, 10) : 1;
        const newQuantity = currentQuantity + delta;
        return { ...item, quantity: Math.max(newQuantity, 1) };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCartItems));
    calculateTotal(updatedCartItems);
  };

  const deleteItem = async (productID) => {
    const updatedCartItems = cartItems.filter((item) => item.productID !== productID);
    setCartItems(updatedCartItems);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCartItems));
    calculateTotal(updatedCartItems);
  };

  const proceedToCheckout = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Your cart is empty!");
      return;
    }

    if (!userID) {
      Alert.alert("User ID not found in async storage.");
      return;
    }

    try {
      const response = await axios.post("https://group17-a58cc073b33a.herokuapp.com/create", {
        userID,
        OrderName: "OrderName",
        cartItems: "items",
        total
      });
      
      if (response.status === 200) {
        console.log("Order created successfully:", response.data);
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
        }, 3000);
        setCartItems([]);
        await AsyncStorage.removeItem("cart");
      } else {
        console.error("Failed to create order:", response.status, response.statusText);
        Alert.alert(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      Alert.alert("An error occurred. Please try again.");
    }
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

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity onPress={proceedToCheckout} style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        Order placed successfully!
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
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    color: '#555',
  },
  quantityText: {
    fontSize: 16,
    paddingHorizontal: 8,
  },
  rightContainer: {
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deleteButton: {
    marginTop: 8,
  },
  footer: {
    marginTop: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#388E3C',
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  snackbar: {
    backgroundColor: '#388E3C',
  },
});

export default Cart;