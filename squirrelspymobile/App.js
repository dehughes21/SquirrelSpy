import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; 

import HomeScreen from './Screens/HomeScreen';
import PreviewSightingScreen from './Screens/PreviewSightingScreen';
import FeedScreen from './Screens/FeedScreen';
import SquirrelsScreen from './Screens/SquirrelsScreen';
import MyProfileScreen from './Screens/MyProfileScreen';
import SightingDetailsScreen from './Screens/SightingDetailsScreen'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Preview Sighting" component={PreviewSightingScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Make a Sighting') {
          iconName = focused ? 'camera' : 'camera-outline';
        } else if (route.name === 'Sightings') {
          iconName = focused ? 'eye' : 'eye-outline';
        } else if (route.name === 'Squirrels') {
          iconName = focused ? 'paw' : 'paw-outline';
        } else if (route.name === 'My Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Make a Sighting" component={HomeStack} />
    <Tab.Screen name="Sightings" component={FeedScreen} />
    <Tab.Screen name="Squirrels" component={SquirrelsScreen} />
    <Tab.Screen name="My Profile" component={MyProfileScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="SightingDetails" component={SightingDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
