import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const CategoryPage = ({ route, navigation }) => {
  const { categoryName } = route.params; // Use categoryName for the API call
  const [items, setItems] = useState([]); // Items specific to the selected category
  const [loading, setLoading] = useState(true); // Loading state

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
        setLoading(false); // Stop loading in both success and error cases
      }
    };

    fetchItemsForCategory();
  }, [categoryName]);

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
        horizontal // Set horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
        contentContainerStyle={styles.horizontalList} // Add spacing
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
    paddingHorizontal: 8, // Add spacing on left and right
  },
  itemCard: {
    width: 150, // Fixed width for square-ish shape
    height: 150, // Fixed height for square-ish shape
    marginHorizontal: 8, // Spacing between items
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 14,
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
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CategoryPage;
