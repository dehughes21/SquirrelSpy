import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchSquirrels } from '../Functions/functions';

const SquirrelsScreen = () => {
    const [squirrels, setSquirrels] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchSquirrels();
            setSquirrels(data);
        };

        fetchData();
    }, []);

    const handleSquirrelPress = (squirrel) => {
        navigation.navigate('SquirrelDetails', squirrel);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleSquirrelPress(item)}>
            <View style={styles.squirrelContainer}>
                <Image source={{ uri: item.image }} style={styles.squirrelImage} />
                <View style={styles.squirrelTextContainer}>
                    <Text style={styles.squirrelName}>{item.name}</Text>
                    <Text>{item.species}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={squirrels}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    squirrelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    squirrelImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    squirrelTextContainer: {
        marginLeft: 10,
    },
    squirrelName: {
        fontWeight: 'bold', 
    },
});

export default SquirrelsScreen;
