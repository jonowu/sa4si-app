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
    textStyle={{
      marginLeft: 20,
    }}
    containerStyle={{
      margin: 0,
      marginBottom: 10,
      paddingHorizontal: 40,
      paddingVertical: 10,
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
