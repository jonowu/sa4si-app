import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import AccountScreen from '../account';
import ActionsStackScreen from '../actions-stack';
import SdgsStackScreen from '../sdgs-stack';

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Actions') {
            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="SDGs" component={SdgsStackScreen} />
      <Tab.Screen name="Actions" component={ActionsStackScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default MainScreen;
