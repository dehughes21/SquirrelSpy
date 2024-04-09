import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SightingDetailScreen = ({ route }) => {
  const { sighting } = route.params;

  return (
    <View style={styles.container}>
      <Text>Squirrel Name: {sighting.squirrel}</Text>
      <Text>Time: {sighting.time}</Text>
      <Text>Behavior: {sighting.behavior}</Text>
      <Image source={{ uri: sighting.image }} style={styles.sightingImage} />
      {/* Additional details can be added */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sightingImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default SightingDetailScreen;
