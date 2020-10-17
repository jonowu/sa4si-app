import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ActionsScreen from '../actions';
import ActionScreen from '../action';
import ActionCompletionScreen from '../action-completion';
import { headerStyling } from '../../constants/headerStyling';


const ActionsStack = createStackNavigator();

function ActionsStackScreen() {
  return (
    <ActionsStack.Navigator initialRouteName="Actions" screenOptions={headerStyling}>
      <ActionsStack.Screen name="Actions" component={ActionsScreen} />
      <ActionsStack.Screen name="Action" component={ActionScreen} />
      <ActionsStack.Screen name="Action Completion" component={ActionCompletionScreen} />
    </ActionsStack.Navigator>
  );
}

export default ActionsStackScreen;
