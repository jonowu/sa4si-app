import { Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import React from 'react';
import { colors } from '../constants/colors';

const ProfilePicture = ({ size, source, onPress, containerStyle, name }) => {
  return (
    <Avatar
      size={size}
      rounded
      source={source}
      onPress={onPress}
      title={name.charAt(0)}
      containerStyle={containerStyle}
      overlayContainerStyle={{ backgroundColor: colors.grey }}
    />
  );
};

ProfilePicture.propTypes = {
  onPress: PropTypes.func,
  containerStyle: PropTypes.object,
};

ProfilePicture.defaultProps = {
  size: 'large',
};

export { ProfilePicture };
