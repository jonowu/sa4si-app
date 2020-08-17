import React from 'react';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';

const Checkbox = ({ title, onPress, isCompleted }) => (
  <CheckBox
    center
    title={title}
    onPress={() => onPress()}
    checked={isCompleted}
    containerStyle={{ width: '100%', margin: 0 }}
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
