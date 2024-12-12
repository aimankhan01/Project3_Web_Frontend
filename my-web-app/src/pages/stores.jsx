import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const StorePage = ({ route, navigation, cart, setCart }) => {
  const { storeName } = route.params; // Receive the category name
  const [items, setItems] = useState([]); // Category-specific items
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch category-specific items
  useEffect(() => {
    const fetchItemsForStore = async () => {
      try {
        console.log(`Fetching items for store: ${storeName}`); // Log the storeName
        const response = await fetch(
          `https://group17-a58cc073b33a.herokuapp.com/products/search/shop?name=${storeName}`
        );
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
        console.log('Fetched items:', data); // Log the fetched data
        setItems(data); // Set the items
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchItemsForStore();
  }, [storeName]);

  // Add an individual item to the cart
  const addItemToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.productID === item.productID
      );

      if (existingItemIndex !== -1) {
        // Update quantity if the item exists in the cart
        return prevCart.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add new item to the cart
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#388E3C" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{storeName} Items</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.productID.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.horizontalList}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addItemToCart(item)}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.viewCartButton}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.viewCartButtonText}>
          View Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
        </Text>
      </TouchableOpacity>
      
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  horizontalList: {
    paddingHorizontal: 8,
    justifyContent: 'space-around',
  },
  itemCard: {
    width: 220,
    height: 220,
    margin: 8,
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 8,
  },
  addButton: {
    padding: 8,
    backgroundColor: '#388E3C',
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewCartButton: {
    padding: 12,
    backgroundColor: '#388E3C',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  viewCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#388E3C',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default StorePage;
