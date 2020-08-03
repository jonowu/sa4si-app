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
            <Text>Verified Status: {firebase.auth().currentUser.emailVerified ? 'verified' : 'unverified'}</Text>
            {value.user.firstName && <Text>Welcome, {value.user.firstName}</Text>}
            {value.user.completedActions ? (
              <>
                <Text>You have completed these actions:</Text>
                {value.user.completedActions.map((completedAction, i) => (
                  <Text key={i}>{completedAction}</Text>
                ))}
              </>
            ) : (
              <Text>You haven’t completed any actions yet!</Text>
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
