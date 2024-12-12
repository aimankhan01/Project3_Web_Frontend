import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: '',
  });

  useEffect(() => {
    axios
      .get('https://group17-a58cc073b33a.herokuapp.com/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error('Error fetching products:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (productID) => {
    axios
      .delete(`https://group17-a58cc073b33a.herokuapp.com/products/remove?productID=${productID}`)
      .then(() => {
        setProducts(products.filter((product) => product.productID !== productID));
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  const handleAddProduct = () => {
    const productData = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock, 10),
    };

    axios
      .post('https://group17-a58cc073b33a.herokuapp.com/products/add', productData)
      .then((response) => {
        setProducts([...products, response.data]);
        setModalVisible(false); 
      })
      .catch((error) => console.error('Error adding product:', error));
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
      <Text style={styles.header}>Product Management</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={15} color="white" />
      </TouchableOpacity>

      <View style={styles.tableRowHeader}>
        <Text style={styles.tableHeaderCell}>Product ID</Text>
        <Text style={styles.tableHeaderCell}>Name</Text>
        <Text style={styles.tableHeaderCell}>Price</Text>
        <Text style={styles.tableHeaderCell}>Category</Text>
        <Text style={styles.tableHeaderCell}>Actions</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
      <FlatList
  data={products}
  keyExtractor={(item) => item.productID ? item.productID.toString() : `${item.name}-${Math.random()}`}
  renderItem={({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.productID}</Text>
      <Text style={styles.tableCell}>{item.name}</Text>
      <Text style={styles.tableCell}>{item.price}</Text>
      <Text style={styles.tableCell}>{item.category}</Text>
      <View style={styles.actionCell}>
        <TouchableOpacity onPress={() => handleDelete(item.productID)}>
          <Icon name="delete" size={20} color="#d9534f" style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </View>
  )}
/>
      </ScrollView>

      {/* Add Product Modal */}
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Add New Product</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={newProduct.name}
        onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={newProduct.price}
        keyboardType="numeric"
        onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={newProduct.category}
        onChangeText={(text) => setNewProduct({ ...newProduct, category: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={newProduct.description}
        onChangeText={(text) => setNewProduct({ ...newProduct, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        value={newProduct.stock}
        keyboardType="numeric"
        onChangeText={(text) => setNewProduct({ ...newProduct, stock: text })}
      />

      {/* Custom styled Add Product button */}
      <TouchableOpacity style={styles.Buttontoadd} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>

      {/* Custom styled Cancel button */}
      <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004725',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: '#004725',
    borderRadius: 50,
    padding: 15,
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
  scrollContainer: {
    flex: 1,
  },
  
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    input: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      marginBottom: 10,
      padding: 10,
      fontSize: 16,
    },
    Buttontoadd: {
      backgroundColor: '#004725',  
      borderRadius: 5,
      paddingVertical: 12,
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: '#f44336',  
      borderRadius: 5,
      paddingVertical: 12,
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    }
});

export default ProductAdmin;