import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const FeedScreen = () => {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    const fetchAllSightings = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/sightings/');
        const allSightings = response.data;
        const sortedSightings = allSightings.sort((a, b) => new Date(b.time) - new Date(a.time));
        setSightings(sortedSightings);
      } catch (error) {
        console.error('Error fetching sightings:', error);
      }
    };

    fetchAllSightings();
  }, []);

  const SightingItem = ({ sighting }) => (
    <View style={styles.sightingItem}>
      <Image source={{ uri: sighting.image }} style={styles.squirrelImage} />
      <View style={styles.sightingTextContainer}>
        <Text style={styles.sightingDateTime}>{sighting.time}</Text>
        <Text style={styles.sightingBehavior}>{sighting.behavior}</Text>
      </View>
      <Image source={{ uri: sighting.image }} style={styles.sightingImage} />
    </View>
  );
  


  return (
    <ScrollView style={styles.container}>
      <View style={styles.sightingsContainer}>
        {sightings.map((sighting, index) => (
          <SightingItem key={index} sighting={sighting} />
        ))}
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
  sightingsContainer: {
    marginBottom: 20,
  },
  sightingItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
  },
  
  sightingImage: {
    width: 400,
    height: 400,
    borderRadius: 10,
  },
  sightingTextContainer: {
    marginLeft: 10,
  },
  squirrelImage: {
    width: 50, // Adjust the width and height as needed
    height: 50,
    alignSelf: 'flex-start',
    marginBottom: 10, // Adjust this value to add space between the squirrel image and sighting text
  },
  sightingDateTime: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sightingBehavior: {
    fontSize: 14,
    color: 'gray',
  },
});

export default FeedScreen;
