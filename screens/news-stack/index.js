import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import NewsScreen from '../news';
import ArticleScreen from '../article';

const NewsStack = createStackNavigator();

function NewsStackScreen() {
  return (
    <NewsStack.Navigator initialRouteName="News">
      <NewsStack.Screen name="News" component={NewsScreen} />
      <NewsStack.Screen name="Article" component={ArticleScreen} />
    </NewsStack.Navigator>
  );
}

export default NewsStackScreen;
