import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const SightingItem = ({ sighting }) => (
  <View style={styles.sightingItem}>
    {sighting.image && <Image source={{ uri: sighting.image }} style={styles.sightingImage} />}
    <View style={styles.sightingTextContainer}>
      <Text style={styles.sightingDateTime}>{sighting.time}</Text>
      <Text style={styles.sightingBehavior}>{sighting.behavior}</Text>
    </View>
  </View>
);

const SquirrelDetailsScreen = ({ route }) => {
  // Extract the squirrel data from the route parameters
  const { id } = route.params;
  const { image, name, species, sex, left_ear_color, right_ear_color, age, weight } = route.params;

  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    const fetchSightings = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:8000/sightings/`);
        const filteredSightings = response.data.filter(sighting => sighting.squirrel === id);
        const sortedSightings = filteredSightings.sort((a, b) => new Date(b.time) - new Date(a.time));
        setSightings(sortedSightings);
      } catch (error) {
        console.error('Error fetching sightings:', error);
      }
    };

    fetchSightings();
  }, [id]);

  return (
    <ScrollView style={styles.container}>
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
      <View style={styles.sightingsContainer}>
        <Text style={styles.heading}>Sightings</Text>
        {sightings.map((sighting, index) => (
          <SightingItem key={index} sighting={sighting} />
        ))}
        {/* Add padding at the bottom */}
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
