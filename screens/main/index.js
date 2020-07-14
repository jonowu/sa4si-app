import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { firebase } from '../../firebase/config';
import { AuthenticatedContext } from '../../context/authenticated-context';

function HomeScreen() {
  const [users, setUsers] = useState();

  function fetchUsers() {
    const db = firebase.firestore();

    db.collection('users')
      .get()
      .then((querySnapshot) => {
        const usersFromFirebase = [];
        querySnapshot.forEach((doc) => {
          usersFromFirebase.push(doc.data());
        });
        setUsers(usersFromFirebase);
      });
    alert(JSON.stringify(users));
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button onPress={() => fetchUsers()} title="Show users collection" />
    </View>
  );
}

function AccountScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <AuthenticatedContext.Consumer>
        {(value) => <Text>Welcome {value.user.fullName}</Text>}
      </AuthenticatedContext.Consumer>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default MainScreen;
