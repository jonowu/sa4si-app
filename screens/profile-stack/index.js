import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EditProfileScreen from '../edit-profile';
import LeaderboardScreen from '../leaderboard';
import ProfileScreen from '../profile';
import ProfileStatsScreen from '../profile-stats';
import SubmitIdeaCompletionScreen from '../submit-idea-completion';
import SubmitIdeaScreen from '../submit-idea';
import { headerStyling } from '../../constants/headerStyling';

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator initialRouteName="Profile" screenOptions={headerStyling}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="User Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Profile Stats" component={ProfileStatsScreen} />
      <ProfileStack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <ProfileStack.Screen name="Edit Profile" component={EditProfileScreen} />
      <ProfileStack.Screen name="Submit an Idea" component={SubmitIdeaScreen} />
      <ProfileStack.Screen name="Idea Submitted" component={SubmitIdeaCompletionScreen} />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;
