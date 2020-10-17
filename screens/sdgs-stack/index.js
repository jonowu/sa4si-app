import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import SdgsScreen from '../sdgs';
import SdgScreen from '../sdg';
import { headerStyling } from '../../constants/headerStyling';

const SdgsStack = createStackNavigator();

function SdgsStackScreen() {
  return (
    <SdgsStack.Navigator initialRouteName="SDGs" screenOptions={headerStyling}>
      <SdgsStack.Screen name="SDGs" component={SdgsScreen} />
      <SdgsStack.Screen name="SDG" component={SdgScreen} />
    </SdgsStack.Navigator>
  );
}

export default SdgsStackScreen;
