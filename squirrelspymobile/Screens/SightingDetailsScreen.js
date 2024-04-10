import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { fetchSquirrels } from '../Functions/functions';

const SightingDetailScreen = ({ route }) => {
  const { sighting } = route.params;
  const [squirrelName, setSquirrelName] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    // Assuming fetchSquirrels is a function that fetches squirrels data
    fetchSquirrels()
      .then(squirrels => {
        const foundSquirrel = squirrels.find(squirrel => squirrel.id === sighting.squirrel);
        if (foundSquirrel) {
          setSquirrelName(foundSquirrel.name);
        } else {
          console.error('Squirrel not found.');
        }
      })
      .catch(error => {
        console.error('Error fetching squirrels:', error);
      });

    // Set the region for the map if sighting's latitude and longitude are available
    if (sighting.lat !== undefined && sighting.long !== undefined) {
      setRegion({
        latitude: sighting.lat,
        longitude: sighting.long,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [sighting.squirrel, sighting.lat, sighting.long]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text>Squirrel Name: {squirrelName || 'Loading...'}</Text>
        <Text>Time: {sighting.time}</Text>
        <Text>Behavior: {sighting.behavior}</Text>
        <Image source={{ uri: sighting.image }} style={styles.sightingImage} />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  map: {
    width: '100%',
    height: 300, // Adjust the height as needed
    borderRadius: 10,
    marginTop: 10,
  },
  sightingImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default SightingDetailScreen;
