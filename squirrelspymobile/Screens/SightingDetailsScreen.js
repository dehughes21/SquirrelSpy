import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { fetchSquirrels } from '../Functions/functions';

const SightingDetailScreen = ({ route }) => {
  const { sighting } = route.params;
  const [squirrelName, setSquirrelName] = useState(null);
  const [squirrelImage, setSquirrelImage] = useState(null);
  const [squirrelLeftEar, setSquirrelLeftEar] = useState(null);
  const [squirrelRightEar, setSquirrelRightEar] = useState(null);
  const [region, setRegion] = useState(null);
  const [formattedDateTime, setFormattedDateTime] = useState(null);


  useEffect(() => {
    fetchSquirrels()
      .then(squirrels => {
        const foundSquirrel = squirrels.find(squirrel => squirrel.id === sighting.squirrel);
        if (foundSquirrel) {
          setSquirrelName(foundSquirrel.name);
          setSquirrelImage(foundSquirrel.image);
          setSquirrelLeftEar(foundSquirrel.left_ear_color);
          setSquirrelRightEar(foundSquirrel.right_ear_color);
        } else {
          console.error('Squirrel not found.');
        }
      })
      .catch(error => {
        console.error('Error fetching squirrels:', error);
      });

    if (sighting.lat !== undefined && sighting.long !== undefined) {
      setRegion({
        latitude: sighting.lat,
        longitude: sighting.long,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }

    const dateTime = new Date(sighting.time);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString();
    setFormattedDateTime(`${formattedDate} ${formattedTime}`);
  }, [sighting.squirrel, sighting.lat, sighting.long]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.squirrelImageContainer}>
          <Image source={{ uri: squirrelImage }} style={styles.squirrelImage} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{squirrelName || 'Loading...'}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.text}>{formattedDateTime || 'Loading...'}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Left Ear Color:</Text>
          <Text style={styles.text}>{squirrelLeftEar}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Right Ear Color:</Text>
          <Text style={styles.text}>{squirrelRightEar}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Behavior:</Text>
          <Text style={styles.text}>{sighting.behavior}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: sighting.image }} style={styles.sightingImage} />
        </View>
        <View style={styles.mapContainer}>
          {region && (
            <MapView
              style={styles.map}
              initialRegion={region}
              showsUserLocation={true}
            >
              <Marker
                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                title="Squirrel Sighting"
                description={squirrelName}
              />
            </MapView>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  text: {
    flex: 1,
  },
  squirrelImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  squirrelImage: {
    width: 150, 
    height: 150, 
    borderRadius: 75, 
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  sightingImage: {
    width: '100%', 
    aspectRatio: 9 / 16, 
    borderRadius: 10,
    alignSelf: 'center', 
  },
  mapContainer: {
    marginBottom: 20,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default SightingDetailScreen;
