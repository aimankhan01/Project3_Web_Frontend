import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, IconButton, AppBar, Toolbar, Snackbar, Alert, Card, CardContent, CardHeader } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';

const ProfilePage = ({ navigation }) => {

  const [user, setUser] = useState({ name: '', email: '' });
  const [updatedData, setUpdatedData] = useState({ name: '', email: '' });
  const [orders, setOrders] = useState([]);  // New state for orders
  const [editField, setEditField] = useState(null); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const userId = localStorage.getItem('userID');
    if (userId) {
      axios.get(`https://group17-a58cc073b33a.herokuapp.com/user?userID=${userId}`)
        .then((response) => {
          const fetchedUser = response.data;
          setUser(fetchedUser);
          setUpdatedData(fetchedUser); 
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setSnackbarMessage('Failed to load user data');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        });

      // Fetch orders for the user
      axios.get(`https://group17-a58cc073b33a.herokuapp.com/orders?userID=${userId}`)
        .then((response) => {
          setOrders(response.data);  // Assume orders are returned in an array
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    }
  }, []);

  const handleUpdate = () => {
    setUser({ ...user, name: updatedData.name, email: updatedData.email });
    localStorage.setItem('user', JSON.stringify({ ...user, name: updatedData.name, email: updatedData.email }));
    setSnackbarMessage('Profile updated successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setEditField(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setSnackbarMessage('Logged out');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
    navigation.navigate('LogIn');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', height: "100%" }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#004725', zIndex: 1000 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: '#FDFEFE' }}>
            Profile Page
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ marginTop: '80px', textAlign: 'center' }}>
        <PersonIcon sx={{ fontSize: '100px', color: 'black' }} />
        <Typography variant="h4" sx={{ margin: '16px 0' }}>
          My Profile Page
        </Typography>

        <Box sx={{ marginBottom: '16px' }}>
          <Typography variant="h6">
            Username: {editField === 'name' ? (
              <TextField
                variant="outlined"
                value={updatedData.name}
                onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                size="small"
                sx={{ width: '200px', marginRight: '8px' }}
              />
            ) : (
              <span>{user.name}</span>
            )}
            <IconButton onClick={() => setEditField(editField === 'name' ? null : 'name')}>
              <EditIcon />
            </IconButton>
          </Typography>
          <Typography variant="h6">
            Email: {editField === 'email' ? (
              <TextField
                variant="outlined"
                type="email"
                value={updatedData.email}
                onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                size="small"
                sx={{ width: '200px', marginRight: '8px' }}
              />
            ) : (
              <span>{user.email}</span>
            )}
            <IconButton onClick={() => setEditField(editField === 'email' ? null : 'email')}>
              <EditIcon />
            </IconButton>
          </Typography>
        </Box>

        <Button variant="contained" onClick={handleUpdate} color="primary" sx={{ display: editField ? 'block' : 'none' }}>
          Update Profile
        </Button>

        {/* MY ORDERS Section */}
        <Box sx={{ width: '100%', marginTop: '40px' }}>
          <Typography variant="h5" sx={{ marginBottom: '16px' }}>
            My Orders
          </Typography>

          {orders.length === 0 ? (
            <Typography variant="body1">You have no orders yet.</Typography>
          ) : (
            orders.map((order, index) => (
              <Card sx={{ marginBottom: '16px', boxShadow: 3, borderRadius: '8px' }} key={index}>
                <CardHeader title={`Order #${order.id}`} subheader={`Placed on ${new Date(order.date).toLocaleDateString()}`} />
                <CardContent>
                  <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                    Status: {order.status}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total: ${order.total}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfilePage;