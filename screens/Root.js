import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import React from 'react';

import { headerStyling } from '../constants/headerStyling';
import { useUser } from '../hooks/useUser';
import { SdgIcon } from '../components/icons/Sdg';
import { Feed } from '../screens/Feed';
import { Sdg } from '../screens/Sdg';
import { Sdgs } from '../screens/Sdgs';
import { Profile } from '../screens/Profile';
import { colors } from '../constants/colors';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { Actions } from '../screens/Actions';
import { Action } from '../screens/Action';
import { EditProfile } from '../screens/EditProfile';
import { ForgotPassword } from '../screens/ForgotPassword';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SdgsStack = () => (
  <Stack.Navigator initialRouteName="SDGs" screenOptions={headerStyling}>
    <Stack.Screen name="SDGs" component={Sdgs} />
    <Stack.Screen name="SDG" component={Sdg} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile" screenOptions={headerStyling}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Edit Profile" component={EditProfile} />
  </Stack.Navigator>
);

const ActionsStack = () => (
  <Stack.Navigator initialRouteName="Actions" screenOptions={headerStyling}>
    <Stack.Screen name="Actions" component={Actions} />
    <Stack.Screen name="Action" component={Action} />
  </Stack.Navigator>
);

const FeedStack = () => (
  <Stack.Navigator initialRouteName="Feed" screenOptions={headerStyling}>
    <Stack.Screen name="Feed" component={Feed} />
    {/* 
    <Stack.Screen name="Article" component={ArticleScreen} />
    <Stack.Screen name="User Profile" component={ProfileScreen} /> */}
  </Stack.Navigator>
);

const Main = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      // eslint-disable-next-line react/display-name
      tabBarIcon: ({ focused, color, size }) => {
        switch (route.name) {
          case 'SDGs':
            return <SdgIcon width={size} height={size} color={!focused && color} />;
          case 'Actions':
            return <Ionicons name="list-circle-outline" size={size} color={color} />;
          case 'Profile':
            return <Ionicons name="person-circle" size={size} color={color} />;
          case 'Feed':
            return <Ionicons name="ios-newspaper-outline" size={size} color={color} />;
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.yellow,
      inactiveTintColor: colors.white,
      style: {
        backgroundColor: colors.darkgray,
      },
      labelStyle: {
        fontFamily: 'Montserrat_700Bold',
      },
    }}
    initialRouteName="Actions"
    // TODO: see if this can be removed
  >
    <Tab.Screen name="SDGs" component={SdgsStack} />
    <Tab.Screen name="Actions" component={ActionsStack} />

    <Tab.Screen name="Feed" component={FeedStack} />
    <Tab.Screen name="Profile" component={ProfileStack} />
    {/*     <Tab.Screen name="Feed" component={FeedStackScreen} />
    <Tab.Screen name="Profile" component={ProfileStackScreen} />   */}
  </Tab.Navigator>
);

export const Root = () => {
  const user = useUser();

  return (
    <>
      {user ? (
        <Main />
      ) : (
        <Stack.Navigator screenOptions={headerStyling}>
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Forgot Password" component={ForgotPassword} />
        </Stack.Navigator>
      )}
    </>
  );
};
