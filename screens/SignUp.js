import React, { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, gql } from '@apollo/client';
import { Formik } from 'formik';

import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { colors } from '../constants/colors';
import { Body } from '../components/Typography';
import { CURRENT_USER_QUERY } from '../hooks/useUser';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const SignUp = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const onFooterLinkPress = () => {
    navigation.navigate('Sign In');
  };

  const [signup] = useMutation(SIGNUP_MUTATION);

  const [signin, { data }] = useMutation(SIGNIN_MUTATION, {
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      onSubmit={async (values) => {
        await signup({ variables: values }).catch((error) => alert(error));
        await signin({ variables: { email: values.email, password: values.password } }).catch((error) => alert(error));
        const error =
          data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure'
            ? data?.authenticateUserWithPassword
            : undefined;

        if (error) {
          alert(error.message);
        }
      }}
      validate={(values) => {
        if (values.password !== values.confirmPassword) {
          alert('Passwords don’t match.');
          return;
        }
        if (values.email === '') {
          alert('Please enter your email.');
          return;
        }
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ handleChange, handleSubmit, values }) => (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <Input label="Full Name" autoCapitalize="none" onChangeText={handleChange('name')} value={values.name} />
            <Input label="E-mail" autoCapitalize="none" onChangeText={handleChange('email')} value={values.email} />
            <Input
              label="Password"
              secureTextEntry={hidePassword}
              autoCapitalize="none"
              onChangeText={handleChange('password')}
              value={values.password}
              secureIcon={
                <Ionicons
                  style={{ padding: 10 }}
                  name={hidePassword ? 'ios-eye-off' : 'ios-eye'}
                  size={25}
                  color={colors.grey}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              }
            />
            <Input
              secureTextEntry={hidePassword}
              label="Confirm Password"
              autoCapitalize="none"
              onChangeText={handleChange('confirmPassword')}
              value={values.confirmPassword}
              secureIcon={
                <Ionicons
                  style={{ padding: 10 }}
                  name={hidePassword ? 'ios-eye-off' : 'ios-eye'}
                  size={25}
                  color={colors.grey}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              }
            />
            <Button title="Register" onPress={handleSubmit} />
            <View style={{ alignItems: 'center', marginBottom: 6 }}>
              <Body variant={3} color={colors.footertext}>
                Already have an account?{' '}
                <Body bold onPress={onFooterLinkPress} variant={3} color={colors.footerLink}>
                  Sign In
                </Body>
              </Body>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export { SignUp };

/* import React, { useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';

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
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
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
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always" extraScrollHeight={100}>
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <Input label="Username" onChangeText={(text) => setUsername(text)} value={username} autoCapitalize="none" />
        <Input label="First Name" onChangeText={(text) => setFirstName(text)} value={firstName} autoCapitalize="none" />
        <Input label="Last Name" onChangeText={(text) => setLastName(text)} value={lastName} autoCapitalize="none" />
        <Input label="E-mail" onChangeText={(text) => setEmail(text)} value={email} autoCapitalize="none" />
        <Input
          secureTextEntry={securePassword}
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
          secureIcon={
            <Ionicons
              style={{ padding: 10 }}
              name={securePassword ? 'ios-eye-off' : 'ios-eye'}
              size={25}
              color={colors.grey}
              onPress={() => setSecurePassword(!securePassword)}
            />
          }
        />
        <Input
          secureTextEntry={secureConfirmPassword}
          label="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          autoCapitalize="none"
          secureIcon={
            <Ionicons
              style={{ padding: 10 }}
              name={secureConfirmPassword ? 'ios-eye-off' : 'ios-eye'}
              size={25}
              color={colors.grey}
              onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}
            />
          }
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
 */
