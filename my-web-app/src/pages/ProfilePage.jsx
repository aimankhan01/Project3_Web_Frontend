import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity } from 'react-native'; // Import TouchableOpacity for navigation
import { Box, Typography, IconButton, Divider, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const ProfilePage = ({ navigation }) => {
    const [user, setUser] = useState({ id:"", name: "", email: "", password: "" });
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editValues, setEditValues] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [orders, setOrders] = useState([]);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            console.log("Stored User from AsyncStorage:", storedUser);
                        if (storedUser) {
                const userObject = JSON.parse(storedUser);
                console.log("User ID:", userObject.userID); 
                setUser({
                    id: userObject.userID || "id",
                    name: userObject.name || "User Name",
                    email: userObject.email || "User Email",
                    password: userObject.password || "", 
                });
                axios
                    .get(`https://group17-a58cc073b33a.herokuapp.com/orders?userID=${user.id}`)
                    .then((response) => {
                        setOrders(response.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching orders:", error);
                    });
            } else {
                navigation.navigate("LogIn");
            }
        };
        fetchUserData();
    }, [navigation]);

    const handleSave = () => {
        if (!user.id) {
            console.error("User ID is undefined!");
            setSnackbarMessage("User ID is missing.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }
    
        const updatedUser = {
            id: editValues.id,
            name: editValues.name,
            email: editValues.email,
            password: editValues.password || "******", // Mask password if not provided
        };
    
        console.log("User ID:", user.id); // Check if user ID is available
    
        axios
            .put(`https://group17-a58cc073b33a.herokuapp.com/users/update?userID=${user.id}`, updatedUser)
            .then((response) => {
                setUser({ ...user, ...updatedUser });
                AsyncStorage.setItem("user", JSON.stringify({ ...user, ...updatedUser }));
                setSnackbarMessage("Profile updated successfully.");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                setEditDialogOpen(false);
            })
            .catch((error) => {
                console.error("Error updating user", error);
                setSnackbarMessage("Error updating profile.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            });
    };

    const handleLogout = () => {
        AsyncStorage.removeItem("user")
            .then(() => {
                setSnackbarMessage("Logged out successfully.");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                navigation.navigate("LogIn");
            })
            .catch((error) => {
                console.error("Error logging out:", error);
                setSnackbarMessage("Error logging out.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            });
    };

    const handleEdit = () => {
        const fetchStoredUser = async () => {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                const userObject = JSON.parse(storedUser);
                setEditDialogOpen(true);
                setEditValues({
                    name: userObject.name || "",
                    email: userObject.email || "",
                    password: userObject.password || "", // Ensure the actual password is passed here
                });
            }
        };
        fetchStoredUser();
    };

    
    const handleCancel = () => {
        setEditDialogOpen(false);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const displayPassword = (password) => {
        return "*".repeat(password.length);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                paddingTop: "64px", // Adjust padding for header space
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    marginTop: "-50px",
                    marginBottom: "20px",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    background: "linear-gradient(135deg, #3a7f5a 0%, #004725 100%)", // Header background color
                    height: "64px", // Fixed height for the header
                    padding: "0 16px", // Horizontal padding for spacing
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow below header
                }}
            >
                <TouchableOpacity onPress={() => navigation.navigate("Homepage")}> {/* Add navigation here */}
                    <Image
                        source={require('../assets/logo.png')} // Correct way to use images in React Native
                        alt="App Logo"
                        style={{ height: '100px', width: '100px', marginTop: '10px', marginLeft: '-10px'}}
                    />
                </TouchableOpacity>
            </Box>

            {/* Main Profile Content */}
            <Box
                sx={{
                    maxWidth: "600px",
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    margin: "24px auto", // Center content with margin
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
                            "linear-gradient(135deg, #004725 0%, #3a7f5a 100%)",
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
                        {user.name+"'s Profile" || "User Name"}
                    </Typography>
                    
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
                            display: "flex",
                            alignItems: "center", // Align items vertically
                        }}
                    >
                        Information
                        <IconButton
                            sx={{ color: "#004725", marginLeft: "8px" }} // Adjusted for spacing
                            onClick={handleEdit}
                        >
                            <EditIcon />
                        </IconButton>
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
                                sx={{
                                    fontWeight: "600",
                                    marginBottom: "4px",
                                    marginLeft: "-250px",
                                }}
                            >
                                Email
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#888", marginLeft: "-250px" }}>
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
                            {displayPassword(user.password)} {/* Display asterisks here */}
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
                        sx={{
                            backgroundColor: "#004725", // Custom green color
                            '&:hover': {
                                backgroundColor: "#3a7f5a", // Slightly darker shade on hover
                            },
                        }}
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
                        type={passwordVisible ? "text" : "password"} // Toggle between text and password
                        value={editValues.password} // Display the password value here
                        onChange={(e) =>
                            setEditValues({ ...editValues, password: e.target.value })
                        }
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Snackbar Component */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        
        </Box>
        
    );
};

export default ProfilePage;