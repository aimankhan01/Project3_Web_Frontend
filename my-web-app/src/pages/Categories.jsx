import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CategoryPage = ({ route }) => {
  const { categoryId, categoryName } = route.params;
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);  // State to manage items added to the cart
  const navigation = useNavigation();

  // Placeholder items for categories (replace this with real data fetching logic)
  const allItems = {
    produce: [
      { id: '1', name: 'Apples', description: 'Fresh and juicy apples' },
      { id: '2', name: 'Bananas', description: 'Ripe bananas' },
      { id: '3', name: 'Oranges', description: 'Citrus oranges' },
    ],
    dairy: [
      { id: '4', name: 'Milk', description: 'Fresh dairy milk' },
      { id: '5', name: 'Cheese', description: 'Cheddar cheese' },
      { id: '6', name: 'Yogurt', description: 'Greek yogurt' },
    ],
    snacks: [
      { id: '7', name: 'Chips', description: 'Potato chips' },
      { id: '8', name: 'Cookies', description: 'Chocolate chip cookies' },
      { id: '9', name: 'Nuts', description: 'Mixed nuts' },
    ],
    // Add more categories here
  };

  useEffect(() => {
    // Fetch items for the selected category
    const fetchItemsForCategory = () => {
      const categoryKey = categoryName.toLowerCase();
      setItems(allItems[categoryKey] || []);
    };

    fetchItemsForCategory();
  }, [categoryName]);

  const handleAddToCart = (item) => {
    // Add item to cart
    setCart((prevCart) => [...prevCart, item]);
    console.log('Added to Cart:', item);
  };

  const handleViewCart = () => {
    // Navigate to the Cart page and pass the cart data
    navigation.navigate('Cart', { cartItems: cart });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoryName} Items</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Button to view cart */}
      <TouchableOpacity
        style={styles.viewCartButton}
        onPress={handleViewCart}
      >
        <Text style={styles.viewCartButtonText}>View Cart ({cart.length})</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemCard: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  addButton: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#388E3C',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: '#388E3C',
    fontWeight: 'bold',
  },
  viewCartButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#388E3C',
    borderRadius: 8,
    alignItems: 'center',
  },
  viewCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CategoryPage;
