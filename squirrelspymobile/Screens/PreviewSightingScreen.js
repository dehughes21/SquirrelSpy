import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, TextInput, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { confirmSighting, savePhoto, discardPhoto, fetchSquirrels } from '../Functions/previewSightingFunctions';

export default function PreviewSightingScreen({ route, navigation }) {
  const { photo } = route.params;
  const [comment, setComment] = useState('');
  const [selectedBehavior, setSelectedBehavior] = useState('');
  const [selectedSquirrel, setSelectedSquirrel] = useState('0');
  const [squirrels, setSquirrels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSquirrels();
      setSquirrels(data);
    };

    fetchData();
  }, []);

  const handleConfirmSighting = async () => {
    await confirmSighting({ photo, selectedSquirrel, selectedBehavior, comment, navigation });
    navigation.goBack()
  };

  const handleSavePhoto = async () => {
    await savePhoto(photo.uri);
  };

  const handleDiscardPhoto = () => {
    discardPhoto(navigation);
  };

  return (
    <SafeAreaView style={styles.containerPreview}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      
        <Image style={styles.preview} source={{ uri: photo.uri }} />

        <View style={styles.buttonsContainer}>
          <Button title="Discard" onPress={handleDiscardPhoto} />
          <Button title="Save Image" onPress={handleSavePhoto} />
          <Button title="Confirm Sighting" onPress={handleConfirmSighting} />
        </View>
        
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Squirrel</Text>
        </View>
        <Picker
        selectedValue = {selectedSquirrel}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedSquirrel(itemValue)}>
          <Picker.Item label="No Tag" value={null} />
            {squirrels.map((squirrel) => (
          <Picker.Item  
            key={squirrel.id}
            label={`Left Ear: ${squirrel.left_ear_color} | Right Ear: ${squirrel.right_ear_color}`}
            value={squirrel.id}
          />
          ))}
          
        </Picker>

        <View style={styles.labelContainer}>
          <Text style={styles.label}>Behavior</Text>
        </View>
        <Picker
        selectedValue = {selectedBehavior}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedBehavior(itemValue)
          }>
          <Picker.Item label="None" value="" />
          <Picker.Item label="Eating" value="Eating" />
          <Picker.Item label="Sleeping" value="Sleeping" />
          <Picker.Item label="Chasing a squirrel" value="Chasing a squirrel" />
        </Picker>
        
        <TextInput
          style={styles.input}
          placeholder="Sighting comment"
          value={comment}
          onChangeText={setComment}
        />


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerPreview: {
    flex: 1,
    backgroundColor: '#f9f9f9', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, 
  },
  preview: {
    width: '80%',
    aspectRatio: 9 / 16, 
    borderRadius: 10, 
    marginBottom: 30, 
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#dcdcdc', 
    borderRadius: 5, 
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff', 
  },
  picker: {
    width: '100%',
    height: 50,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff', 
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dcdcdc', 
  },
  labelContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row', 
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333', 
    marginRight: 10, 
  },
});
