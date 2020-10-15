import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { api } from '../../data';
import { AuthenticatedContext } from '../../context/authenticated-context';
import Button from '../../components/button';
import Input from '../../components/input';
import Screen from '../../components/screen';
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
    <Screen>
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
        <View style={styles.footerView}>
          <Body variant={3} color={colors.footertext}>
            Don’t have an account?{' '}
            <Body onPress={onFooterLinkPress} variant={3} color={colors.footerlink} style={{ fontWeight: 'bold' }}>
              Sign up
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
    marginTop: 20,
  },
});
