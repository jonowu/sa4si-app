import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { View } from 'react-native';
import gql from 'graphql-tag';
import React from 'react';

import { Button } from '../components/Button';
import { Input } from '../components/Input';

const FORGOT_PASSWORD_MUTATION = gql`
  mutation FORGOT_PASSWORD_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const ForgotPassword = () => {
  const [forgotPassword] = useMutation(FORGOT_PASSWORD_MUTATION);

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={async (values) => {
        await forgotPassword({ variables: values }).catch((error) => alert(error));
      }}
      validate={(values) => {
        if (values.email === '') {
          alert('Please enter your email.');
          return;
        }
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Input label="E-mail" autoCapitalize="none" onChangeText={handleChange('email')} value={values.email} />
          <Button title="Reset" onPress={handleSubmit} disabled={values.email === ''} />
        </View>
      )}
    </Formik>
  );
};

export { ForgotPassword };
