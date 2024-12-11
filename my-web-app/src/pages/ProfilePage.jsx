import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const ProfilePage = ({ navigation }) => {
  const [user, setUser] = useState({ name: "", email: "", password: "******" });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editValues, setEditValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      setUser({ ...userObject, password: "******" }); // Keep password hidden

      // Fetch user orders
      axios
        .get(
          `https://group17-a58cc073b33a.herokuapp.com/orders?userID=${userObject.id}`
        )
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    } else {
      navigation.navigate("LoginPage");
    }
  }, [navigation]);

  const handleEdit = () => {
    setEditDialogOpen(true);
    setEditValues({
      name: user.name,
      email: user.email,
      password: "",
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: editValues.name,
      email: editValues.email,
      password: editValues.password || "******", // Keep password hidden if not updated
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Save locally
    setEditDialogOpen(false);
  };

  const handleCancel = () => {
    setEditDialogOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigation.navigate("LogIn");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        {/* User Profile Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, #f46b45 0%, #eea849 100%)",
            color: "#fff",
            padding: "24px",
          }}
        >
          <img
            src="https://img.icons8.com/bubbles/100/000000/user.png"
            alt="User"
            style={{ borderRadius: "50%", marginBottom: "16px" }}
          />
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            {user.name || "User Name"}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "8px" }}>
            {user.email || "User Email"}
          </Typography>
          <IconButton sx={{ color: "#fff" }} onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </Box>

        {/* Information Section */}
        <Box sx={{ padding: "24px" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "600",
              marginBottom: "16px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "8px",
            }}
          >
            Information
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: "600", marginBottom: "4px" }}
              >
                Username
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                {user.name || "N/A"}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: "600", marginBottom: "4px" }}
              >
                Email
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                {user.email || "N/A"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ marginTop: "16px" }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "600", marginBottom: "4px" }}
            >
              Password
            </Typography>
            <Typography variant="body2" sx={{ color: "#888" }}>
              {user.password}
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Orders Section */}
        <Box sx={{ padding: "24px" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "600",
              marginBottom: "16px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "8px",
            }}
          >
            My Orders
          </Typography>
          {orders.length > 0 ? (
            orders.map((order) => (
              <Box
                key={order.id}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "12px",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "600" }}>
                  Order ID: {order.id}
                </Typography>
                <Typography variant="body2">
                  Date: {order.date}
                </Typography>
                <Typography variant="body2">
                  Total: ${order.total}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ color: "#888" }}>
              No orders found.
            </Typography>
          )}
        </Box>

        <Divider />

        {/* Footer Section */}
        <Box sx={{ textAlign: "center", padding: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCancel}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            fullWidth
            margin="dense"
            value={editValues.name}
            onChange={(e) =>
              setEditValues({ ...editValues, name: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={editValues.email}
            onChange={(e) =>
              setEditValues({ ...editValues, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            fullWidth
            margin="dense"
            type="password"
            value={editValues.password}
            onChange={(e) =>
              setEditValues({ ...editValues, password: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;