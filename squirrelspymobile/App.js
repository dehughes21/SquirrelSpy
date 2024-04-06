import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { confirmSighting, savePhoto, discardPhoto, fetchSquirrels} from './previewSightingFunctions';
//import { getExifData } from 'expo-exif';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Preview Sighting" component={PreviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function HomeScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus.status === 'granted');
    })();
  }, []);

  const takePic = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, exif: true};
      const newPhoto = await cameraRef.current.takePictureAsync(options);
      navigation.navigate('Preview Sighting', { photo: newPhoto });
    }
  };

  if (hasCameraPermission === null || hasLocationPermission === null) {
    return <Text>Requesting permissions...</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (hasLocationPermission === false) {
    return <Text>No access to location</Text>;
  }

  return (
    <View style={styles.containerHome}>
      <Camera style={styles.camera} ref={cameraRef} />
      <Button title="Take Picture" onPress={takePic} />
    </View>
  );
}

async function getLocation() {
  const location = await Location.getCurrentPositionAsync({});
  const lat = location.coords.latitude;
  const long = location.coords.longitude;
  return [lat, long];
}


function PreviewScreen({ route, navigation }) {
  const { photo } = route.params;
  const [comment, setComment] = useState('');
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
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
          <Picker.Item label="Select a squirrel" value={null} />
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
  containerHome: {
    flex: 1,
    backgroundColor: '#f9f9f9', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
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