import React from 'react';
import { Button, Text } from 'react-native';

import { AuthenticatedContext } from '../../context/authenticated-context';
import { firebase } from '../../firebase/config';
import Screen from '../../components/screen';

function AccountScreen() {
  return (
    <Screen style={{ justifyContent: 'center' }}>
      <Text>Settings!</Text>
      <AuthenticatedContext.Consumer>
        {(value) => (
          <>
            {value.user && <Text>Welcome, {value.user.firstName}</Text>}
            {console.log('helloo', value.user)}
            <Button
              title="Logout"
              onPress={() => {
                value.setUser(false);
              }}
            ></Button>
          </>
        )}
      </AuthenticatedContext.Consumer>
    </Screen>
  );
}

export default AccountScreen;
