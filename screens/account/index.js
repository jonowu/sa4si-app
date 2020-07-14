import React from 'react';
import { Text } from 'react-native';

import { AuthenticatedContext } from '../../context/authenticated-context';
import Screen from '../../components/screen';

function AccountScreen() {
  return (
    <Screen style={{ justifyContent: 'center' }}>
      <Text>Settings!</Text>
      <AuthenticatedContext.Consumer>
        {(value) => <Text>Welcome {value.user.fullName}</Text>}
      </AuthenticatedContext.Consumer>
    </Screen>
  );
}

export default AccountScreen;
