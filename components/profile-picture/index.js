import React from 'react';
import { Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';

const ProfilePicture = ({ size, source, firstName, lastName, onPress, containerStyle }) => {
  const initials = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();

  return (
    <Avatar
      size={size}
      rounded
      source={source}
      title={initials}
      onPress={onPress}
      containerStyle={containerStyle}
      overlayContainerStyle={{ backgroundColor: 'grey' }}
    />
  );
};

ProfilePicture.propTypes = {
  onPress: PropTypes.func,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
};

ProfilePicture.defaultProps = {
  size: 'large',
};

export default ProfilePicture;
