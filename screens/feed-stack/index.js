import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ArticleScreen from '../article';
import FeedScreen from '../feed';
import ProfileScreen from '../profile';

const FeedStack = createStackNavigator();

function FeedStackScreen() {
  return (
    <FeedStack.Navigator initialRouteName="Feed">
      <FeedStack.Screen name="Feed" component={FeedScreen} />
      <FeedStack.Screen name="Article" component={ArticleScreen} />
      <FeedStack.Screen name="User Profile" component={ProfileScreen} />
    </FeedStack.Navigator>
  );
}

export default FeedStackScreen;
