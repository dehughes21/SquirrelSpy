import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

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
        // Update isLoggedIn state to true upon successful login
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
      <Button title="Login" onPress={handleLogin} />
      <Button title="Create Account" onPress={navigateToCreateAccount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default LoginScreen;
