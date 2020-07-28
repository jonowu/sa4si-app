import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ActionsScreen from '../actions';
import ActionScreen from '../action';

const ActionsStack = createStackNavigator();

function ActionsStackScreen() {
  return (
    <ActionsStack.Navigator initialRouteName="Actions">
      <ActionsStack.Screen name="Actions" component={ActionsScreen} />
      <ActionsStack.Screen name="Action" component={ActionScreen} />
    </ActionsStack.Navigator>
  );
}

export default ActionsStackScreen;
