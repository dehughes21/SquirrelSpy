import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchSquirrels } from '../Functions/functions'; 
import axios from 'axios';

const SightingItem = React.memo(({ sighting, squirrels, navigation }) => {
  const getSquirrelName = (squirrelId) => {
    const squirrel = squirrels.find(squirrel => squirrel.id === squirrelId);
    return squirrel ? squirrel.name : 'Untagged';
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric' 
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  const handleImagePress = () => {
    navigation.navigate('SightingDetails', { sighting });
  };

  return (
    <TouchableOpacity onPress={handleImagePress}>
      <View style={styles.sightingItem}>
        <Text style={styles.squirrelName}>{getSquirrelName(sighting.squirrel)}</Text>
        <View style={styles.sightingTextContainer}>
          <Text style={styles.sightingDateTime}>{formatDate(sighting.time)}</Text>
          <Text style={styles.sightingBehavior}>{sighting.behavior}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: sighting.image }} style={styles.sightingImage} />
        </View>
      </View>
    </TouchableOpacity>
  );
});

const FeedScreen = ({ navigation }) => {
  const [sightings, setSightings] = useState([]);
  const [squirrels, setSquirrels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchAllSightings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://10.0.2.2:8000/sightings/?page=${pageNumber}`);
        const allSightings = response.data;
        const sortedSightings = allSightings.sort((a, b) => new Date(b.time) - new Date(a.time));
        setSightings(prevSightings => [...prevSightings, ...sortedSightings]);
      } catch (error) {
        console.error('Error fetching sightings:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllSquirrels = async () => {
      try {
        const squirrelData = await fetchSquirrels();
        setSquirrels(squirrelData);
      } catch (error) {
        console.error('Error fetching squirrels:', error);
      }
    };

    fetchAllSightings();
    fetchAllSquirrels();
  }, [pageNumber]);

  const handleLoadMore = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <FlatList
      data={sightings}
      renderItem={({ item }) => <SightingItem sighting={item} squirrels={squirrels} navigation={navigation} />}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    />
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
    marginBottom: 30,
  },
  sightingImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  sightingTextContainer: {
    marginLeft: 10,
  },
  sightingDateTime: {
    fontSize: 16,
    color: 'gray',
  },
  squirrelName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sightingBehavior: {
    fontSize: 14,
    color: 'gray',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1, 
  },
});

export default FeedScreen;
