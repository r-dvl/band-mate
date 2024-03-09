import React, { useState, useContext } from 'react';
import { Button, TextInput, Text, View } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';
import { AuthContext } from '@components/Auth';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);

  const login = async () => {
    try {
      const response = await axios.post('http://192.168.1.38:8080/v1/auth/token/', qs.stringify({
        username,
        password,
        grant_type: 'password'
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      await AsyncStorage.setItem('token', response.data.access_token);
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
