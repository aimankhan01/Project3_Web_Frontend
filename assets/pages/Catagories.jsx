import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CategoryPage = ({ route }) => {
  const { categoryId, categoryName } = route.params;
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   // Fetch data for the selected category
  //   fetch(`http://localhost:8081`)
  //     .then(response => response.json())
  //     .then(data => setItems(data))
  //     .catch(error => console.error('Error fetching category items:', error));
  // }, [categoryId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoryName} Items</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
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
});

export default CategoryPage;
