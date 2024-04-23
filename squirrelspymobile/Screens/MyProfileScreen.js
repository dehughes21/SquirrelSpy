import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function MyProfileScreen({ navigation }) {
  const [profileInfo, setProfileInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const userId = parseFloat(await AsyncStorage.getItem('user_id'));

        const response = await fetch('http://10.0.2.2:8000/users/');
        if (response.ok) {
          const users = await response.json();
          const loggedInUser = users.find(user => user.id === userId);

          setProfileInfo(loggedInUser);
        } else {
          console.error('Failed to fetch users:', response.status);
        }
      } catch (error) {
        console.error('Error fetching profile information:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileInfo();
  }, []); 

  const handleLogout = async () => {
    try {
    
      await AsyncStorage.removeItem('user_id');
      await AsyncStorage.removeItem('token');
      
    
      navigation.navigate("Login");
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!profileInfo) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Failed to load profile information.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Name: {profileInfo.name}</Text>
      <Text>Email: {profileInfo.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
