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

const ShopAdmin = ({ navigation }) => { // Add navigation prop here if using React Navigation
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newShop, setNewShop] = useState({
    name: '',
  });

  useEffect(() => {
    axios
      .get('https://group17-a58cc073b33a.herokuapp.com/shops')  // Use your backend URL here
      .then((response) => {
        setShops(response.data);
      })
      .catch((error) => console.error('Error fetching shops:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (shopID) => {
    axios
      .delete(`https://group17-a58cc073b33a.herokuapp.com/shops/remove?shopID=${shopID}`)
      .then(() => {
        setShops(shops.filter((shop) => shop.shopID !== shopID));
      })
      .catch((error) => console.error('Error deleting shop:', error));
  };

  const handleAddShop = () => {
    const shopData = {
      ...newShop,
    };

    axios
      .post('https://group17-a58cc073b33a.herokuapp.com/shops/add', shopData)
      .then((response) => {
        setShops([...shops, response.data]);
        setModalVisible(false); 
      })
      .catch((error) => console.error('Error adding shop:', error));
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#004725" />
        </TouchableOpacity>
        <Text style={styles.header}>Shop Management</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={15} color="white" />
      </TouchableOpacity>

      <View style={styles.tableRowHeader}>
        <Text style={styles.tableHeaderCell}>Shop ID</Text>
        <Text style={styles.tableHeaderCell}>Name</Text>
        <Text style={styles.tableHeaderCell}>Actions</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <FlatList
          data={shops}
          keyExtractor={(item) => item.shopID ? item.shopID.toString() : `${item.name}-${Math.random()}`}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.shopID}</Text>
              <Text style={styles.tableCell}>{item.name}</Text>
              <View style={styles.actionCell}>
                <TouchableOpacity onPress={() => handleDelete(item.shopID)}>
                  <Icon name="delete" size={20} color="#d9534f" style={styles.actionIcon} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>

      {/* Add Shop Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Shop</Text>

            <TextInput
              style={styles.input}
              placeholder="Shop Name"
              value={newShop.name}
              onChangeText={(text) => setNewShop({ ...newShop, name: text })}
            />
            
            <TouchableOpacity style={styles.Buttontoadd} onPress={handleAddShop}>
              <Text style={styles.buttonText}>Add Shop</Text>
            </TouchableOpacity>

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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004725',
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
  },
});

export default ShopAdmin;