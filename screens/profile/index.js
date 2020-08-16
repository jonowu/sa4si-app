import React, { useContext } from 'react';
import { Text } from 'react-native';

import { AuthenticatedContext } from '../../context/authenticated-context';
import Screen from '../../components/screen';

function ProfileScreen() {
  const authContext = useContext(AuthenticatedContext);
  const user = authContext.user.data;

  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      {user.username && <Text>Username: {user.username}</Text>}
      {user.email && <Text>Email: {user.email}</Text>}
    </Screen>
  );
}

export default ProfileScreen;
