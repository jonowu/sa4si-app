import React from 'react';
import { Text, View } from 'react-native';

import { AuthenticatedContext } from '../../context/authenticated-context';

function AccountScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <AuthenticatedContext.Consumer>
        {(value) => <Text>Welcome {value.user.fullName}</Text>}
      </AuthenticatedContext.Consumer>
    </View>
  );
}

export default AccountScreen;
