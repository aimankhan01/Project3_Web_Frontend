import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

const OrdersAdmin = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editValues, setEditValues] = useState({
    orderID: null,
    cartItems: '',
    total: '',
  });

  useEffect(() => {
    axios
      .get('https://group17-a58cc073b33a.herokuapp.com/all')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => console.error('Error fetching orders:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (orderID) => {
    axios
      .delete(`https://group17-a58cc073b33a.herokuapp.com/delete?orderID=${orderID}`)
      .then(() => {
        setOrders(orders.filter((order) => order.orderID !== orderID));
      })
      .catch((error) => console.error('Error deleting order:', error));
  };

  const handleEditOpen = (order) => {
    setEditValues({
      orderID: order.orderID,
      cartItems: order.cartItems.join(', '),
      total: order.total,
    });
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    const { orderID, cartItems, total } = editValues;
    const updatedDetails = {
      cartItems: cartItems.split(',').map((item) => item.trim()),
      total: parseFloat(total),
    };

    axios
      .patch(`https://group17-a58cc073b33a.herokuapp.com/update?orderID=${orderID}`, updatedDetails)
      .then(() => {
        setOrders(
          orders.map((order) =>
            order.orderID === orderID ? { ...order, ...updatedDetails } : order
          )
        );
        setEditDialogOpen(false);
      })
      .catch((error) => console.error('Error updating order:', error));
  };

  const handleEditCancel = () => {
    setEditDialogOpen(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#004725" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#004725" />
        </TouchableOpacity>
        <Text style={styles.header}>Order Management</Text>
      </View>

      <View style={styles.tableRowHeader}>
  <Text style={styles.tableHeaderCell}>Order ID</Text>
  <Text style={styles.tableHeaderCell}>User ID</Text> {/* Added User ID */}
  <Text style={styles.tableHeaderCell}>Cart Items</Text>
  <Text style={styles.tableHeaderCell}>Total</Text>
  <Text style={styles.tableHeaderCell}>Actions</Text>
</View>

<FlatList
  data={orders}
  keyExtractor={(item) => item.orderID.toString()}
  renderItem={({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.orderID || 'N/A'}</Text>
      <Text style={styles.tableCell}>{item.userID || 'N/A'}</Text> {/* Display User ID */}
      <Text style={styles.tableCell}>
        {Array.isArray(item.cartItems) && item.cartItems.length > 0
          ? item.cartItems.join(', ')
          : 'No items'}
      </Text>
      <Text style={styles.tableCell}>{item.total != null ? item.total : '0'}</Text>
      <View style={styles.actionCell}>
        
        <TouchableOpacity onPress={() => handleDelete(item.orderID)}>
          <Icon name="delete" size={20} color="#d9534f" style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </View>
  )}
/>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditCancel}>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent>
          <TextField
            label="Cart Items (comma-separated)"
            value={editValues.cartItems}
            onChange={(e) => setEditValues({ ...editValues, cartItems: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Total"
            value={editValues.total}
            onChange={(e) => setEditValues({ ...editValues, total: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#004725',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#004725',
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  actionCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    marginHorizontal: 5,
  },
});

export default OrdersAdmin;