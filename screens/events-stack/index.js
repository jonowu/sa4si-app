import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import EventsScreen from '../events';
import EventScreen from '../event';

const EventsStack = createStackNavigator();

function EventsStackScreen() {
  return (
    <EventsStack.Navigator initialRouteName="Events">
      <EventsStack.Screen name="Events" component={EventsScreen} />
      <EventsStack.Screen name="Event" component={EventScreen} />
    </EventsStack.Navigator>
  );
}

export default EventsStackScreen;
