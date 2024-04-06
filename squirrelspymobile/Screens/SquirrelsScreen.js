// SquirrelsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchSquirrels } from '../Functions/previewSightingFunctions';

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
    // Navigate to SquirrelDetailsScreen with the selected squirrel ID
    navigation.navigate('SquirrelDetails', squirrel);
  };

  

  
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => handleSquirrelPress(item)}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
          <View style={{ marginLeft: 10 }}>
            <Text>{item.name}</Text>
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
  
  export default SquirrelsScreen;

  
