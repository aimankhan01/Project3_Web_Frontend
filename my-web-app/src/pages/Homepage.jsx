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
    navigation.navigate('CategoryDetail', { categoryId: category.id, categoryName: category.name });
  };

  const handleStorePress = (store) => {
    console.log(`Clicked on ${store.name}`);
    navigation.navigate('Search', { searchQuery: store.name });
  };

  return (
    <LinearGradient
      colors={['#4CAF50', '#388E3C', '#2E7D32']}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Custom Header with Drawer Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome name="bars" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Home</Text>
        </View>

        {/* Search Bar with Cart Icon */}
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
  container: {
    flexGrow: 1,
    padding: 16,
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
    marginLeft: 10,
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderRadius: 25,
  },
  searchIcon: {
    padding: 10,
    backgroundColor: '#388E3C',
    borderRadius: 25,
    marginLeft: 10,
  },
  cartIcon: {
    padding: 10,
    marginLeft: 10,
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
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryCard: {
    alignItems: 'center',
    width: 100,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
  },
});

export default Homepage;