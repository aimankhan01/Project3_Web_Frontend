import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Homepage = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const categories = [
    { id: '1', name: 'Produce', image: './assets/Produce.jpg' },
    { id: '2', name: 'Dairy', image: './assets/Dairy.jpg' },
    { id: '3', name: 'Snacks', image: './assets/Snacks.jpg' },
    { id: '4', name: 'Meat', image: './assets/Meat.jpg' },
    { id: '5', name: 'Bakery', image: './assets/Bakery.jpg' },
    { id: '6', name: 'Frozen Foods', image: './assets/Frozenfood.jpg' },
    { id: '7', name: 'Drinks', image: './assets/Drinks.jpg' },
    { id: '8', name: 'Personal Care & Household', image: './assets/Houshold.jpg' },
  ];

  const stores = [
    { id: '9', name: 'Costco', image: './assets/costco.png' },
    { id: '10', name: 'Walmart', image: './assets/walmart.jpg' },
    { id: '11', name: 'Grocery Outlet', image: './assets/Groceryoutlet.png' },
    { id: '12', name: 'Walgreens', image: './assets/walgreens.png' },
  ];

  const handleCategoryPress = (category) => {
    console.log(`Clicked on ${category.name}`);
    // Add navigation or any other logic here
  };

  return (
    <LinearGradient
      colors={['#4CAF50', '#388E3C', '#2E7D32']}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Bar with Drawer, Search Bar, and Add to Cart Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.drawerIcon}>
            <FontAwesome name="bars" size={24} color="#fff" />
          </TouchableOpacity>

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
          </View>

          <TouchableOpacity style={styles.cartButton}>
            <FontAwesome name="shopping-cart" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesContainer}>
          <View style={styles.categoryRow}>
            {categories.slice(0, 4).map((category) => (
              <View key={category.id} style={styles.categoryCard}>
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: category.image }} style={styles.categoryImage} />
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
                  <Image source={{ uri: category.image }} style={styles.categoryImage} />
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
                  <Image source={{ uri: store.image }} style={styles.categoryImage} />
                </View>
                <TouchableOpacity onPress={() => handleCategoryPress(store)}>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  drawerIcon: {
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', 
    borderRadius: 25,
    flex: 1,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
  },
  searchIcon: {
    padding: 10,
    backgroundColor: '#388E3C',
    borderRadius: 25,
  },
  cartButton: {
    padding: 10,
    backgroundColor: '#388E3C',
    borderRadius: 25,
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
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 260,
    margin: 25,
  },
  imageWrapper: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
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
  categoryTextHovered: {
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
});

export default Homepage;

