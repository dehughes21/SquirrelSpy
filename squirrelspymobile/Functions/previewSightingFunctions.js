import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';
import * as Location from 'expo-location';



export async function confirmSighting({ photo, selectedSquirrel, selectedBehavior, comment, navigation }) {
  const formData = new FormData();

  // Get user.id from token??
  formData.append('user', 1);

  // Get squirrel.id from left and right ear colors
  formData.append('squirrel', selectedSquirrel);

  const loc = await getLocation();
  const lat = loc[0];
  const long = loc[1];
  formData.append('lat', lat);
  formData.append('long', long);
  formData.append('time', new Date().toISOString());

  // Get from user
  formData.append('certainty_level', 3);
  formData.append('behavior', selectedBehavior);
  formData.append('comment', comment);
  formData.append('image', {
    uri: photo.uri,
    type: 'image/jpeg',
    name: 'photo.jpg',
  });

  console.log(formData);

  // Send sighting
  const response = await fetch('http://10.0.2.2:8000/sightings/', {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log("json: ", json);
  }).catch(function(ex) {
    console.log("failed: ", ex);
  });
}

async function getLocation() {
  const location = await Location.getCurrentPositionAsync({});
  const lat = location.coords.latitude;
  const long = location.coords.longitude;
  return [lat, long];
}


export async function savePhoto(uri) {
  await MediaLibrary.saveToLibraryAsync(uri);
}

export function discardPhoto(navigation) {
  Alert.alert(
    'Discard Image',
    'Are you sure you want to discard this image?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Discard',
        onPress: () => navigation.goBack(),
        style: 'destructive',
      },
    ],
    { cancelable: false }
  );
}

export async function fetchSquirrels() {
    try {
      const response = await fetch('http://10.0.2.2:8000/squirrels/');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching squirrels:', error);
      return [];
    }
  }