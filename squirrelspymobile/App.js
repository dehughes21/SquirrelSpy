import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './Screens/HomeScreen';
import PreviewSightingScreen from './Screens/PreviewSightingScreen';
import FeedScreen from './Screens/FeedScreen';
import SquirrelsScreen from './Screens/SquirrelsScreen';
import MyProfileScreen from './Screens/MyProfileScreen';
import LeaderboardScreen from './Screens/LeaderboardScreen';
import SquirrelDetailsScreen from './Screens/SquirrelDetailsScreen';
import SightingDetailsScreen from './Screens/SightingDetailsScreen';
import LoginScreen from './Screens/LoginScreen';
import CreateAccountScreen from './Screens/CreateAccountScreen';

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
    initialRouteName="Home"
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
        } else if (route.name === 'Leaderboard') {
          iconName = focused ? 'trending-up-outline' : 'trending-up-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Make a Sighting" component={HomeStack} />
    <Tab.Screen name="Sightings" component={FeedScreen} />
    <Tab.Screen name="Squirrels" component={SquirrelsScreen} />
    <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
    <Tab.Screen name="My Profile" component={MyProfileScreen} />
  </Tab.Navigator>
);

const MainStack = () => (
  <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="SquirrelDetails" component={SquirrelDetailsScreen} />
    <Stack.Screen name="SightingDetails" component={SightingDetailsScreen} />
  </Stack.Navigator>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainStack />
      ) : (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
