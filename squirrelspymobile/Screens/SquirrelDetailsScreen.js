// SquirrelDetailsScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SquirrelDetailsScreen = ({ route }) => {
    // Extract the squirrel data from the route parameters
    const { image, name, species } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.squirrelInfo}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.species}>{species}</Text>
                </View>
            </View>
            {/* Add additional content here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    squirrelInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    textContainer: {
        marginLeft: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    species: {
        fontSize: 18,
        color: 'gray',
    },
});

export default SquirrelDetailsScreen;
