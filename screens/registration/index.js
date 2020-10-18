import React, { useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { api } from '../../data';
import { AuthenticatedContext } from '../../context/authenticated-context';
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
    <KeyboardAwareScrollView extraScrollHeight={100}>
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
        <View style={{ alignItems: 'center', marginBottom: 6 }}>
          <Body variant={3}>
            Already got an account?{' '}
            <Body bold onPress={onFooterLinkPress} variant={3} color={colors.footerLink}>
              Log in
            </Body>
          </Body>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
