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

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editValues, setEditValues] = useState({
    userID: null,
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    axios
      .get('https://group17-a58cc073b33a.herokuapp.com/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error('Error fetching users:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (userID) => {
    axios
      .delete(`https://group17-a58cc073b33a.herokuapp.com/users/remove?userID=${userID}`)
      .then(() => {
        setUsers(users.filter((user) => user.userID !== userID));
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  const handleEditOpen = (user) => {
    setEditValues({
      userID: user.userID,
      name: user.name,
      email: user.email,
      role: user.admin.toString(), // Convert to string for dropdown
    });
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    const { userID, ...updatedDetails } = editValues;
    axios
      .put(`https://group17-a58cc073b33a.herokuapp.com/users/update?userID=${userID}`, updatedDetails)
      .then(() => {
        setUsers(users.map((user) =>
          user.userID === userID ? { ...user, ...updatedDetails, admin: updatedDetails.role === "true" } : user
        ));
        setEditDialogOpen(false);
      })
      .catch((error) => console.error('Error updating user:', error));
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
      <Text style={styles.header}>User Management</Text>

      <View style={styles.tableRowHeader}>
        <Text style={styles.tableHeaderCell}>User ID</Text>
        <Text style={styles.tableHeaderCell}>Username</Text>
        <Text style={styles.tableHeaderCell}>Email</Text>
        <Text style={styles.tableHeaderCell}>Role</Text>
        <Text style={styles.tableHeaderCell}>Actions</Text>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.userID.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.userID}</Text>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.email}</Text>
            <Text style={styles.tableCell}>{item.admin ? 'Yes' : 'No'}</Text>
            <View style={styles.actionCell}>
              <TouchableOpacity onPress={() => handleEditOpen(item)}>
                <Icon name="edit" size={20} color="#004725" style={styles.actionIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.userID)}>
                <Icon name="delete" size={20} color="#d9534f" style={styles.actionIcon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditCancel}>
  <DialogTitle>Edit User</DialogTitle>
  <DialogContent>
    <TextField
      label="Name"
      value={editValues.name}
      onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Email"
      value={editValues.email}
      onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      select
      label="Role"
      value={editValues.role}
      onChange={(e) => setEditValues({ ...editValues, role: e.target.value })}
      fullWidth
      margin="normal"
      SelectProps={{
        native: true,
      }}
    >
      <option value="">Select Role</option>
      <option value="true">Admin</option>
      <option value="false">User</option>
    </TextField>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004725',
    textAlign: 'center',
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

export default UserAdmin;