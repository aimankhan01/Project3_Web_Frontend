import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CategoryPage = ({ route, navigation }) => {
  const { categoryName } = route.params;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchItemsForCategory = async () => {
      try {
        const response = await fetch(
          `https://group17-a58cc073b33a.herokuapp.com/products/search/category?category=${categoryName}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItemsForCategory();
  }, [categoryName]);

  const toggleSelectItem = (item) => {
    setSelectedItems((prevSelected) => {
      const existingItem = prevSelected.find((selectedItem) => selectedItem.productID === item.productID);
      if (existingItem) {
        return prevSelected.filter((selectedItem) => selectedItem.productID !== item.productID);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    selectedItems.forEach((item) => {
      let quantity = quantities[item.productID] || 1;
      for (let i = 0; i < quantity; i++) {
        cart.push(item);
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    navigation.navigate('Cart', { cartItems: cart });
  };

  const updateQuantity = (itemID, operation) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[itemID] || 1;
      let newQuantity = operation === '+' ? currentQuantity + 1 : currentQuantity - 1;

      if (newQuantity < 1) newQuantity = 1; // Ensure quantity is at least 1

      return {
        ...prevQuantities,
        [itemID]: newQuantity,
      };
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Homepage')}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{categoryName} Items</Text>
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
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => updateQuantity(item.productID, '-')}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantities[item.productID] || 1}</Text>
              <TouchableOpacity onPress={() => updateQuantity(item.productID, '+')}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.addButton, selectedItems.some((i) => i.productID === item.productID) ? styles.addedButton : null]}
              onPress={() => toggleSelectItem(item)}
            >
              <Text style={styles.addButtonText}>
                {selectedItems.some((i) => i.productID === item.productID) ? 'Remove from Cart' : 'Add'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => toggleSelectItem(item)}>
              <FontAwesome name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.checkoutButton} onPress={addToCart}>
        <Text style={styles.checkoutButtonText}>Add Selected Items to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  addedButton: {
    backgroundColor: '#E57373',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    fontSize: 18,
    padding: 4,
    backgroundColor: '#388E3C',
    color: '#fff',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
    backgroundColor: '#E57373',
    borderRadius: 4,
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

export default CategoryPage;
