import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CreateAccountScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleCreateAccount = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      if (profilePicture) {
        formData.append('profile_picture', {
          uri: profilePicture.uri,
          name: 'profile_picture.jpg',
          type: 'image/jpeg',
        });
      }

      const response = await fetch('http://10.0.2.2:8000/register/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Registration successful
        // Handle navigation or display success message
        Alert.alert('Success', 'Account created successfully.');
        navigation.navigate('Login'); // Navigate to login screen
      } else {
        // Registration failed
        // Handle error response
        const responseData = await response.json();
        Alert.alert('Error', responseData.non_field_errors || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      // Handle unexpected errors
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  const selectProfilePicture = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please allow access to your photo library to select a profile picture.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setProfilePicture(result);
      }
    } catch (error) {
      console.error('Error selecting profile picture:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#800000' }}>Create Account</Text>
      {profilePicture && <Image source={{ uri: profilePicture.uri }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }} />}
      <Button title="Select Profile Picture" onPress={selectProfilePicture} color="#561216" />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ height: 40, width: 200, borderColor: '#800000', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10, backgroundColor: '#FFF' }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ height: 40, width: 200, borderColor: '#800000', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10, backgroundColor: '#FFF' }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={{ height: 40, width: 200, borderColor: '#800000', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10, backgroundColor: '#FFF' }}
      />
      <Button title="Create Account" onPress={handleCreateAccount} color="#A68145" />
    </View>
  );
};

export default CreateAccountScreen;
