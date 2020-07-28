import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import SdgsScreen from '../sdgs';
import SdgScreen from '../sdg';

const SdgsStack = createStackNavigator();

function SdgsStackScreen() {
  return (
    <SdgsStack.Navigator initialRouteName="SDGs">
      <SdgsStack.Screen name="SDGs" component={SdgsScreen} />
      <SdgsStack.Screen name="SDG" component={SdgScreen} />
    </SdgsStack.Navigator>
  );
}

export default SdgsStackScreen;
