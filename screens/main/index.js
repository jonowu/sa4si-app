import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ProfileStackScreen from '../profile-stack';
import ActionsStackScreen from '../actions-stack';
import SdgsStackScreen from '../sdgs-stack';
import NewsStackScreen from '../news-stack';

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Actions') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          } else if (route.name === 'Profile') {
            iconName = 'ios-person';
          } else if (route.name == 'News') {
            iconName = 'ios-calendar';
          } else if (route.name == 'SDGs') {
            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'gray',
      }}
      initialRouteName="Actions"
      lazy={false}
    >
      <Tab.Screen name="SDGs" component={SdgsStackScreen} />
      <Tab.Screen name="Actions" component={ActionsStackScreen} />
      <Tab.Screen name="News" component={NewsStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}

export default MainScreen;
