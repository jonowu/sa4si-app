import React from 'react';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';

const Checkbox = ({ title, onPress, isCompleted }) => (
  <CheckBox
    right
    title={title}
    onPress={() => onPress()}
    checked={isCompleted}
    size={25}
    iconType="material-community"
    checkedIcon="checkbox-marked-circle-outline"
    uncheckedIcon="circle-outline"
    checkedColor="#DC2D27"
    uncheckedColor="black"
    textStyle={{
      marginLeft: 5,
      color: isCompleted ? '#DC2D27' : 'black',
      fontSize: 14,
    }}
    containerStyle={{
      borderColor: 'white',
      backgroundColor: 'white',
      margin: 0,
      padding: 0,
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
