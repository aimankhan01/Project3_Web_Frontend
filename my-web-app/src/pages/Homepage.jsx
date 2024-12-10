import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Homepage = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [apiData, setApiData] = useState([]);

  const categories = [
    { id: '1', name: 'Produce', image: require('../assets/Produce.jpg') },
    { id: '2', name: 'Dairy', image: require('../assets/Dairy.jpg') },
    { id: '3', name: 'Snacks', image: require('../assets/Snacks.jpg') },
    { id: '4', name: 'Meat', image: require('../assets/Meat.jpg') },
    { id: '5', name: 'Bakery', image: require('../assets/Bakery.jpg') },
    { id: '6', name: 'Frozen Foods', image: require('../assets/Frozenfood.jpg') },
    { id: '7', name: 'Drinks', image: require('../assets/Drinks.jpg') },
    { id: '8', name: 'Household', image: require('../assets/Houshold.jpg') },
  ];

  const stores = [
    { id: '9', name: 'Costco', image: require('../assets/Costco.png') },
    { id: '10', name: 'Walmart', image: require('../assets/walmart.jpg') },
    { id: '11', name: 'Grocery Outlet', image: require('../assets/Groceryoutlet.png') },
    { id: '12', name: 'Walgreens', image: require('../assets/walgreens.png') },
  ];

  const handleCategoryPress = (category) => {
    console.log(`Clicked on ${category.name}`);
    navigation.navigate('Categories', { categoryId: category.id, categoryName: category.name });
  };

  const handleStorePress = (store) => {
    console.log(`Clicked on ${store.name}`);
    navigation.navigate('Search', { searchQuery: store.name });
  };

  return (
    <LinearGradient
      colors={['#4CAF50', '#388E3C', '#2E7D32']}
      style={[styles.gradientContainer, { flex: 1 }]}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer} style={{ flex: 1 }}>
        {/* Custom Header with Drawer Button, Search, and Cart */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome name="bars" size={24} color="#000" />
          </TouchableOpacity>

          {/* Logo Image */}
          <Image
            source={require('../assets/logo.png')} // Replace with your logo path
            style={styles.logoImage}
          />

          {/* Removed the Home text */}

          {/* Search Bar with Search, Account, and Cart Icons on the right */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for items..."
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity style={styles.searchIcon}>
              <FontAwesome name="search" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
              <FontAwesome name="shopping-cart" size={24} color="#388E3C" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountIcon} onPress={() => navigation.navigate('ProfilePage')}>
              <FontAwesome name="user-circle" size={24} color="#388E3C" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Section */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesContainer}>
          <View style={styles.categoryRow}>
            {categories.slice(0, 4).map((category) => (
              <View key={category.id} style={styles.categoryCard}>
                <View style={styles.imageWrapper}>
                  <Image source={category.image} style={styles.categoryImage} />
                </View>
                <TouchableOpacity onPress={() => handleCategoryPress(category)}>
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.categoryRow}>
            {categories.slice(4, 8).map((category) => (
              <View key={category.id} style={styles.categoryCard}>
                <View style={styles.imageWrapper}>
                  <Image source={category.image} style={styles.categoryImage} />
                </View>
                <TouchableOpacity onPress={() => handleCategoryPress(category)}>
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Stores Section */}
        <Text style={styles.sectionTitle}>Stores</Text>
        <View style={styles.categoriesContainer}>
          <View style={styles.categoryRow}>
            {stores.map((store) => (
              <View key={store.id} style={styles.categoryCard}>
                <View style={styles.imageWrapper}>
                  <Image source={store.image} style={styles.categoryImage} />
                </View>
                <TouchableOpacity onPress={() => handleStorePress(store)}>
                  <Text style={styles.categoryText}>{store.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1, // Ensures content takes the available space and allows scrolling
    padding: 16,
    paddingBottom: 100,
    
  },
  header: {
    height: 50,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#000',
    flex: 1, // Occupy the rest of the space in header
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute', // Position search, cart, and account icons absolutely
    right: 10,
  },
  searchInput: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderRadius: 25,
    width: 750, // Adjust this value to make the search bar longer
  },
  searchIcon: {
    padding: 10,
    backgroundColor: '#388E3C',
    borderRadius: 25,
  },
  cartIcon: {
    padding: 10,
    marginLeft: 10,
  },
  accountIcon: {
    padding: 10,
    marginLeft: 10,
  },
  logoImage: {
    width: 50, // Set the width for your logo image
    height: 100, // Set the height for your logo image
    marginLeft: 20, // Adjust the margin for spacing
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
    textAlign: 'center',
  },
  categoriesContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap', // Allow categories to wrap if they don't fit in one row
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200, // Adjust size to make the cards fit better on the page
    height: 250, // Adjust size to make the cards fit better on the page
    margin: 8, // Smaller margin for better spacing
  },
  imageWrapper: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  categoryImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 16,
    color: '#388E3C',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 8,
  },
});

export default Homepage;