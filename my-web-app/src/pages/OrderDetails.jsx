import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const OrderDetails = ({ route }) => {
  const { orderDetails } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <FlatList
        data={orderDetails.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemPrice}>Price: ${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
      <Text style={styles.totalText}>Total: ${orderDetails.total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 16,
    color: '#555',
  },
  itemPrice: {
    fontSize: 16,
    color: '#555',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default OrderDetails;
