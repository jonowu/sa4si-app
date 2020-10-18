import React from 'react';
import { ButtonGroup as ButtonGroupElement } from 'react-native-elements';
import PropTypes from 'prop-types';

import { colors } from '../../constants/colors';

const ButtonGroup = ({ buttons, selectedIndex, onPress }) => (
  <ButtonGroupElement
    onPress={onPress}
    selectedIndex={selectedIndex}
    buttons={buttons}
    containerStyle={{ height: 30 }}
    selectedButtonStyle={{ backgroundColor: colors.yellow }}
    selectedTextStyle={{ color: colors.black }}
    textStyle={{ fontFamily: 'OpenSans_600SemiBold' }}
  />
);

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.string),
  selectedIndex: PropTypes.number,
  onPress: PropTypes.func.isRequired,
};

export default ButtonGroup;
