import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../profile';
import LeaderboardScreen from '../leaderboard';
import SubmitIdeaScreen from '../submit-idea';
import SubmitIdeaCompletionScreen from '../submit-idea-completion';

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <ProfileStack.Screen name="Submit an Idea" component={SubmitIdeaScreen} />
      <ProfileStack.Screen name="Idea Submitted" component={SubmitIdeaCompletionScreen} />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;
