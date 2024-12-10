import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoryOpen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Category Details</Text>
            <Text style={styles.description}>
                Here, you can display information related to the selected category.
            </Text>
            <View style={styles.categoryInfo}>
                <Text style={styles.infoText}>Category Name: Placeholder Name</Text>
                <Text style={styles.infoText}>Category Description: Placeholder Description</Text>
                {/* Additional category details can be displayed here */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    categoryInfo: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    infoText: {
        fontSize: 14,
        marginBottom: 5,
    },
});

export default CategoryOpen;
