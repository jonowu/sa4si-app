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

const SignIn = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const onFooterLinkPress = () => {
    navigation.navigate('Sign Up');
  };

  const [signin, { data }] = useMutation(SIGNIN_MUTATION, {
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values) => {
        await signin({ variables: values }).catch((error) => alert(error));
        const error =
          data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure'
            ? data?.authenticateUserWithPassword
            : undefined;

        if (error) {
          alert(error.message);
        }
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
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
            <Button title="Log in" onPress={handleSubmit} />
            <View style={{ alignItems: 'center', marginBottom: 6 }}>
              <Body variant={3} color={colors.footertext}>
                Don’t have an account?{' '}
                <Body bold onPress={onFooterLinkPress} variant={3} color={colors.footerLink}>
                  Sign up
                </Body>
              </Body>

              <Body variant={3} color={colors.footertext}>
                Trouble signing in?{' '}
                <Body bold onPress={() => navigation.navigate('Forgot Password')} variant={3} color={colors.footerLink}>
                  Reset password
                </Body>
              </Body>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export { SignIn };
