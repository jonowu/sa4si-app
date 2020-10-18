import React, { useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { api } from '../../data';
import { AuthenticatedContext } from '../../context/authenticated-context';
import Button from '../../components/button';
import Input from '../../components/input';
import { colors } from '../../constants/colors';
import { Body } from '../../components/typography/index';

export default function LoginScreen({ navigation }) {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Registration');
  };

  const storeAsyncStorage = async (token, user) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', user);
    } catch (error) {
      console.log(error);
    }
  };

  const login = (setUser) => {
    axios
      .post(`${api}/auth/local`, {
        identifier: emailOrUsername,
        password: password,
      })
      .then((response) => {
        setUser({ data: response.data.user });
        storeAsyncStorage(response.data.jwt, JSON.stringify(response.data.user)); // store the token and user in async storage
      })
      .catch((error) => {
        error.response.data.message[0].messages.forEach((errMsg) => alert(errMsg.message));
      });
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <Input
          label="E-mail or Username"
          autoCapitalize="none"
          onChangeText={(text) => setEmailOrUsername(text)}
          value={emailOrUsername}
        />
        <Input
          label="Password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <AuthenticatedContext.Consumer>
          {({ setUser }) => <Button title="Log In" onPress={() => login(setUser)} />}
        </AuthenticatedContext.Consumer>
        <View style={{ alignItems: 'center', marginBottom: 6 }}>
          <Body variant={3} color={colors.footertext}>
            Don’t have an account?{' '}
            <Body bold onPress={onFooterLinkPress} variant={3} color={colors.footerLink}>
              Sign up
            </Body>
          </Body>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
