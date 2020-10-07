import axios from 'axios';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { api } from '../../data';
import { AuthenticatedContext } from '../../context/authenticated-context';
import Screen from '../../components/screen';
import Input from '../../components/input';
import Button from '../../components/button';

export default function RegistrationScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  const register = (value) => {
    if (password !== confirmPassword) {
      alert('Passwords don’t match.');
      return;
    }
    if (username === '') {
      alert('Please enter your username.');
      return;
    }
    if (email === '') {
      alert('Please enter your email.');
      return;
    }
    if (firstName === '') {
      alert('Please enter your first name.');
      return;
    }
    if (lastName === '') {
      alert('Please enter your last name.');
      return;
    }

    const storeData = async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (e) {
        alert('Saving data to storage failed.');
      }
    };

    axios
      .post(`${api}/auth/local/register`, {
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })
      .then((response) => {
        value.setUser({ data: response.data.user });
        storeData('token', response.data.jwt);
        storeData('user', JSON.stringify(response.data.user));
      })
      .catch((error) => {
        error.response.data.message[0].messages.forEach((errMsg) => alert(errMsg.message));
        console.log('An error occurred:', error.response.data);
      });
  };

  return (
    <Screen scrollable>
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <Input label="Username" onChangeText={(text) => setUsername(text)} value={username} autoCapitalize="none" />
        <Input label="First Name" onChangeText={(text) => setFirstName(text)} value={firstName} autoCapitalize="none" />
        <Input label="Last Name" onChangeText={(text) => setLastName(text)} value={lastName} autoCapitalize="none" />
        <Input label="E-mail" onChangeText={(text) => setEmail(text)} value={email} autoCapitalize="none" />
        <Input
          secureTextEntry
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />
        <Input
          secureTextEntry
          label="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          autoCapitalize="none"
        />
        <AuthenticatedContext.Consumer>
          {(value) => <Button title="Create Account" onPress={() => register(value)} />}
        </AuthenticatedContext.Consumer>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
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
    marginTop: 10,
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
