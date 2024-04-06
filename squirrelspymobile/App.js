import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import PreviewSightingScreen from './Screens/PreviewSightingScreen';
import FeedScreen from './Screens/FeedScreen';
import SquirrelsScreen from './Screens/SquirrelsScreen';
import MyProfileScreen from './Screens/MyProfileScreen';
import SquirrelDetailsScreen from './Screens/SquirrelDetailsScreen'; // Import the SquirrelDetailsScreen

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Preview Sighting" component={PreviewSightingScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Camera" component={HomeStack} />
    <Tab.Screen name="Feed" component={FeedScreen} />
    <Tab.Screen name="Squirrels" component={SquirrelsScreen} />
    <Tab.Screen name="My Profile" component={MyProfileScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="SquirrelDetails" component={SquirrelDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}