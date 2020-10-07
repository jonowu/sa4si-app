import React from 'react';
import { Input as InputElement } from 'react-native-elements';
import PropTypes from 'prop-types';

const Input = ({ label, value, onChangeText, secureTextEntry, autoCapitalize }) => (
  <InputElement
    secureTextEntry={secureTextEntry}
    label={label}
    value={value}
    onChangeText={onChangeText}
    labelStyle={{ marginBottom: 5, fontSize: 14 }}
    inputContainerStyle={{
      paddingLeft: 10,
      backgroundColor: 'white',
      borderBottomWidth: 0,
      borderRadius: 20,
      height: 48,
      overflow: 'hidden',
    }}
    containerStyle={{ marginBottom: 10 }}
    autoCapitalize={autoCapitalize}
    renderErrorMessage={false}
  />
);

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  autoCapitalize: PropTypes.string,
};

export default Input;
