import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { api } from '../../data';
import { AuthenticatedContext } from '../../context/authenticated-context';
import Screen from '../../components/screen';

export default function LoginScreen({ navigation }) {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Registration');
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      alert('Saving data to storage failed.');
    }
  };

  const login = (value) => {
    axios
      .post(`${api}/auth/local`, {
        identifier: emailOrUsername,
        password: password,
      })
      .then((response) => {
        value.setUser({ data: response.data.user, token: response.data.jwt });
        storeData('token', response.data.jwt);
        storeData('user', JSON.stringify(response.data.user));
      })
      .catch((error) => {
        error.response.data.message[0].messages.forEach((errMsg) => alert(errMsg.message));
      });
  };

  return (
    <Screen>
      <View style={{ width: '100%' }}>
        <TextInput
          style={styles.input}
          placeholder="E-mail or Username"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmailOrUsername(text)}
          value={emailOrUsername}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <AuthenticatedContext.Consumer>
          {(value) => (
            <TouchableOpacity style={styles.button} onPress={() => login(value)}>
              <Text style={styles.buttonTitle}>Log in</Text>
            </TouchableOpacity>
          )}
        </AuthenticatedContext.Consumer>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don’t have an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: 'center',
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerView: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d',
  },
  footerLink: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
