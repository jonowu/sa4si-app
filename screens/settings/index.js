import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { firebase } from '../../firebase/config';
import { AuthenticatedContext } from '../../context/authenticated-context';
import Screen from '../../components/screen';

const settingsList = [
  {
    title: 'Change Account Details',
  },
  {
    title: 'Change Password',
  },
  {
    title: 'Privacy Policy',
  },
  {
    title: 'Logout',
  },
];

function logout(value) {
  firebase.auth().signOut();
  value.setUser(false);
}

function SettingsScreen() {
  return (
    <Screen>
      <AuthenticatedContext.Consumer>
        {(value) => (
          <View>
            {settingsList.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                bottomDivider
                chevron
                onPress={() => (item.title == 'Logout' ? logout(value) : null)}
              />
            ))}
          </View>
        )}
      </AuthenticatedContext.Consumer>
    </Screen>
  );
}

export default SettingsScreen;
