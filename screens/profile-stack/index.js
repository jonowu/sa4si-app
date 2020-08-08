import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import ProfileScreen from '../profile';
import SettingsScreen from '../settings';

const ProfileStack = createStackNavigator();

function ProfileStackScreen({ navigation }) {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // eslint-disable-next-line react/display-name
          headerRight: () => (
            <Feather
              name="settings"
              size={26}
              onPress={() => navigation.navigate('Settings')}
              style={{ marginRight: 12 }}
            />
          ),
        }}
      />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;
