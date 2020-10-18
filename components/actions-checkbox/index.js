import React from 'react';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';

const Checkbox = ({ title, onPress, isCompleted }) => (
  <CheckBox
    left
    title={title}
    onPress={() => onPress()}
    checked={isCompleted}
    size={42}
    iconType="material-community"
    checkedIcon="checkbox-marked-circle-outline"
    uncheckedIcon="circle-outline"
    checkedColor="black"
    uncheckedColor="black"
    titleProps={{
      numberOfLines: 2,
    }}
    textStyle={{
      width: '80%',
      fontWeight: 'normal',
      marginLeft: 20,
      color: 'black',
      fontSize: 15,
      fontFamily: 'OpenSans_600SemiBold',
    }}
    containerStyle={{
      margin: 0,
      marginBottom: 10,
      borderRadius: 20,
    }}
  />
);

Checkbox.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  isCompleted: PropTypes.bool,
};

Checkbox.defaultProps = {
  isCompleted: false,
};

export default Checkbox;
