import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ProfileStackScreen from '../profile-stack';
import ActionsStackScreen from '../actions-stack';
import SdgsStackScreen from '../sdgs-stack';
import FeedStackScreen from '../feed-stack';
import { colors } from '../../constants/colors';

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
          } else if (route.name == 'Feed') {
            iconName = 'ios-calendar';
          } else if (route.name == 'SDGs') {
            iconName = 'ios-pie';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.yellow,
        inactiveTintColor: colors.white,
        style: {
          backgroundColor: colors.darkgray,
        },
        labelStyle: {
          fontFamily: 'Montserrat_700Bold',
        },
      }}
      initialRouteName="Actions"
      lazy={false}
    >
      <Tab.Screen name="Actions" component={ActionsStackScreen} />
      <Tab.Screen name="Feed" component={FeedStackScreen} />
      <Tab.Screen name="SDGs" component={SdgsStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}

export default MainScreen;
