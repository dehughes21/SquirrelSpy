import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const SquirrelDetailsScreen = ({ route, navigation }) => {
  const { id, image, name, species, sex, left_ear_color, right_ear_color, age, weight } = route.params;
  const [sightings, setSightings] = useState([]);
  const [mapData, setMapData] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchSightings = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:8000/sightings/`);
        const filteredSightings = response.data.filter(sighting => sighting.squirrel === id);
        const sortedSightings = filteredSightings.sort((a, b) => new Date(b.time) - new Date(a.time));
        const recentSightings = sortedSightings.slice(0, 5);
        setSightings(recentSightings);

        const coordinates = recentSightings.map(sighting => ({
          latitude: sighting.lat,
          longitude: sighting.long,
          title: 'Sighting Location',
          description: sighting.behavior,
        }));
        setMapData(coordinates);
      } catch (error) {
        console.error('Error fetching sightings:', error);
      }
    };

    fetchSightings();
  }, [id]);

  useEffect(() => {
    if (mapData.length > 0 && mapRef.current) {
      const initialRegion = calculateInitialRegion(mapData);
      mapRef.current.animateToRegion(initialRegion, 1000);
    }
  }, [mapData]);

  const calculateInitialRegion = (coordinates) => {
    if (coordinates.length === 0) {
      return {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }

    let maxLat = -90;
    let minLat = 90;
    let maxLong = -180;
    let minLong = 180;

    coordinates.forEach(coord => {
      maxLat = Math.max(maxLat, coord.latitude);
      minLat = Math.min(minLat, coord.latitude);
      maxLong = Math.max(maxLong, coord.longitude);
      minLong = Math.min(minLong, coord.longitude);
    });

    const centerLat = (maxLat + minLat) / 2;
    const centerLong = (maxLong + minLong) / 2;
    const deltaLat = Math.abs(maxLat - minLat);
    const deltaLong = Math.abs(maxLong - minLong);
    const delta = Math.max(deltaLat, deltaLong, 0.1);

    return {
      latitude: centerLat,
      longitude: centerLong,
      latitudeDelta: delta,
      longitudeDelta: delta,
    };
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.squirrelInfo}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.species}>{species}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Sex: {sex}</Text>
        <Text style={styles.detail}>Left Ear Color: {left_ear_color}</Text>
        <Text style={styles.detail}>Right Ear Color: {right_ear_color}</Text>
        <Text style={styles.detail}>Age: {age}</Text>
        <Text style={styles.detail}>Weight: {weight} lbs</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView ref={mapRef} style={styles.map} initialRegion={calculateInitialRegion(mapData)}>
          {mapData.map((marker, index) => (
            <Marker key={index} coordinate={marker} title={marker.title} description={marker.description} />
          ))}
        </MapView>
      </View>

      <View style={styles.sightingsContainer}>
        <Text style={styles.heading}>Sightings</Text>
        {sightings.map((sighting, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('SightingDetails', { sighting })}>
            <View style={styles.sightingItem}>
              {sighting.image && <Image source={{ uri: sighting.image }} style={styles.sightingImage} />}
              <View style={styles.sightingTextContainer}>
                <Text style={styles.sightingDateTime}>{sighting.time}</Text>
                <Text style={styles.sightingBehavior}>{sighting.behavior}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 20 }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  mapContainer: {
    marginBottom: 20,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
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
  detailsContainer: {
    marginTop: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  sightingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sightingImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  sightingTextContainer: {
    marginLeft: 10,
  },
  sightingDateTime: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sightingBehavior: {
    fontSize: 14,
    color: 'gray',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sightingsContainer: {
    marginBottom: 20,
  },
});

export default SquirrelDetailsScreen;
