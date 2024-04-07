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
      <Image source={{ uri: sighting.image }} style={styles.sightingImage} />
      <View style={styles.sightingTextContainer}>
        <Text style={styles.sightingDateTime}>{sighting.time}</Text>
        <Text style={styles.sightingBehavior}>{sighting.behavior}</Text>
      </View>
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
});

export default FeedScreen;
