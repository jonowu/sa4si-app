import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthenticatedContext } from './context/authenticated-context';
import { firebase } from './firebase/config';
import MainScreen from './screens/main';
import LoginScreen from './screens/login';
import RegistrationScreen from './screens/registration';

const Stack = createStackNavigator();

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  // const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (user === false) {
    firebase.auth().signOut();
  }

  if (loading) {
    return <></>;
  }

  return (
    <AuthenticatedContext.Provider value={{ setUser, user }}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen name="Main">
              {(props) => <MainScreen {...props} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthenticatedContext.Provider>
  );
}

export default App;
