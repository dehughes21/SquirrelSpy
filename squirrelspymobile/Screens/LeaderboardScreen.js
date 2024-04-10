import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fetchUsers, fetchSightings } from '../Functions/functions'; // Import fetch functions from api.js

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true);
      try {
      
        const users = await fetchUsers();
        const sightings = await fetchSightings();

        
        const userSightingsCount = {};
        sightings.forEach(sighting => {
          if (userSightingsCount[sighting.user]) {
            userSightingsCount[sighting.user]++;
          } else {
            userSightingsCount[sighting.user] = 1;
          }
        });

        
        const leaderboard = users.map(user => ({
          userId: user.id,
          username: user.username,
          sightingsCount: userSightingsCount[user.id] || 0,
        }));

       
        leaderboard.sort((a, b) => b.sightingsCount - a.sightingsCount);

        setLeaderboardData(leaderboard);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={leaderboardData}
          ListHeaderComponent={() => (
            <View style={styles.leaderboardHeader}>
              <Text style={styles.columnHeader}>Rank</Text>
              <Text style={styles.columnHeader}>Username</Text>
              <Text style={styles.columnHeader}>Sightings</Text>
            </View>
          )}
          renderItem={({ item, index }) => (
            <View style={styles.leaderboardItem}>
              <Text>{index + 1}</Text>
              <Text>{item.username}</Text>
              <Text>{item.sightingsCount}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  columnHeader: {
    fontWeight: 'bold',
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default LeaderboardScreen;
