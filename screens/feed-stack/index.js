import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ArticleScreen from '../article';
import FeedScreen from '../feed';

const FeedStack = createStackNavigator();

function FeedStackScreen() {
  return (
    <FeedStack.Navigator initialRouteName="Feed">
      <FeedStack.Screen name="Feed" component={FeedScreen} />
      <FeedStack.Screen name="Article" component={ArticleScreen} />
    </FeedStack.Navigator>
  );
}

export default FeedStackScreen;
