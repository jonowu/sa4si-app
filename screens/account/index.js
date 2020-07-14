import React from 'react';
import { Button, Text } from 'react-native';

import { AuthenticatedContext } from '../../context/authenticated-context';
import { firebase } from '../../firebase/config';
import Screen from '../../components/screen';

function AccountScreen() {
  return (
    <Screen style={{ justifyContent: 'center' }}>
      <AuthenticatedContext.Consumer>
        {(value) => (
          <>
            {value.user.firstName && (
              <Text>Welcome, {value.user.firstName}</Text>
            )}
            <Button
              title="Logout"
              onPress={() => {
                firebase.auth().signOut();
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
