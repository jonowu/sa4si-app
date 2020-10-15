import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { api } from '../../data';
import { AuthenticatedContext } from '../../context/authenticated-context';
import Screen from '../../components/screen';
import Input from '../../components/input';
import Button from '../../components/button';
import { colors } from '../../constants/colors';
import { Body } from '../../components/typography/index';

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

  const storeAsyncStorage = async (token, user) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', user);
    } catch (error) {
      console.log(error);
    }
  };

  const register = (setUser) => {
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

    axios
      .post(`${api}/auth/local/register`, {
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })
      .then((response) => {
        setUser({ data: response.data.user });
        storeAsyncStorage(response.data.jwt, JSON.stringify(response.data.user)); // store the token and user data in async storage
      })
      .catch((error) => {
        error.response.data.message[0].messages.forEach((errMsg) => alert(errMsg.message));
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
          {({ setUser }) => <Button title="Create Account" onPress={() => register(setUser)} />}
        </AuthenticatedContext.Consumer>
        <View style={styles.footerView}>
          <Body variant={3} color={colors.footertext}>
            Already got an account?{' '}
            <Body onPress={onFooterLinkPress} variant={3} color={colors.footerlink} style={{ fontWeight: 'bold' }}>
              Log in
            </Body>
          </Body>
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
    backgroundColor: colors.white,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  footerView: {
    alignItems: 'center',
    marginTop: 10,
  },
});
