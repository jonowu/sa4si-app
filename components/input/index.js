import React from 'react';
import { Input as InputElement } from 'react-native-elements';
import PropTypes from 'prop-types';

import { colors } from '../../constants/colors';

const Input = ({ label, value, onChangeText, secureTextEntry, autoCapitalize, secureIcon }) => (
  <InputElement
    secureTextEntry={secureTextEntry}
    label={label}
    value={value}
    onChangeText={onChangeText}
    labelStyle={{
      color: colors.grey,
      marginBottom: 5,
      fontSize: 14,
      fontFamily: 'Montserrat_700Bold',
      fontWeight: 'normal',
    }}
    inputStyle={{ fontFamily: 'OpenSans_400Regular', fontSize: 14 }}
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
    rightIcon={secureIcon}
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
