import React, { useState, useContext } from 'react';
import { Button, TextInput, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dependencies
import qs from 'qs';

// Components
import { AuthContext } from '@components/Auth';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);

  const login = async () => {
    try {
      // TODO: Protect API URL
      const response = await fetch('http://192.168.1.38:8080/v1/auth/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify({
          username,
          password,
          grant_type: 'password'
        })
      });

      if (!response.ok) {
        throw new Error('Incorrect username or password.');
      }

      const data = await response.json();
      await AsyncStorage.setItem('token', data.access_token);
      setUser({ username });
    } catch (error) {
      console.error(error);
      setError('Incorrect username or password.');
    }
  };

  return (
    <View>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={login} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
}
