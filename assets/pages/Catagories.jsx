import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';



const CategoryPage = ({ route, navigation }) => {
  // const { categoryId, categoryName } = route.params;
  

  const items = [
    { id: '1', name: 'Apple', description: 'Fresh Red Apples', price: '$1.00', image: 'apple.jpg' },
    { id: '2', name: 'Orange', description: 'Juicy Oranges', price: '$1.20', image: 'orange.jpg' },
  ];

  const onSwipeLeft = () => {
    navigation.goBack(); 
  };


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    
    
       
        <View style={styles.container}>
          {/* Header Bar with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <FontAwesome name="arrow-left" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Catagories</Text>
          </View>


          {/* Items List */}
          <View style={styles.itemsContainer}>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              contentContainerStyle={styles.listContainer}
            />
          </View>
        </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
    justifyContent: 'flex-start', 
  },
  header: {
    height: 60,
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#388E3C',
    marginBottom: 20,
    paddingHorizontal: 10, 
  },
  backButton: {
    marginRight: 10, 
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 20,
    alignSelf: 'center', 
    width: '80%', 
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  searchIcon: {
    padding: 10,
    backgroundColor: '#388E3C',
    borderRadius: 25,
  },
  itemsContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  listContainer: {
    paddingVertical: 20,
  },
  itemContainer: {
    width: 250,
    height: 250,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
    justifyContent: 'center', 
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  addToCartButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#388E3C',
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default CategoryPage;
