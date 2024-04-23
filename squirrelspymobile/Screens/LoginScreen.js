import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Store token and userId in AsyncStorage upon successful login
        await AsyncStorage.setItem('token', responseData.token);
        await AsyncStorage.setItem('user_id', String(responseData.user_id));

        // To get userId at a later time, use const userId = await AsyncStorage.getItem('user_id');

        setIsLoggedIn(true);
      } else {
        const responseData = await response.json();
        Alert.alert('Error', responseData.error || 'Login failed.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  const navigateToCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SquirrelSpy</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createAccountButton} onPress={navigateToCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set a background color
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#561216',
    width: '80%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  createAccountButton: {
    backgroundColor: '#A68145',
    width: '80%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
