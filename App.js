import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';

import { AuthenticatedContext } from './context/authenticated-context';
import LoginScreen from './screens/login';
import MainScreen from './screens/main';
import RegistrationScreen from './screens/registration';
import client from './utils/apolloClient';

const Stack = createStackNavigator();

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  const readData = async () => {
    try {
      const userValue = await AsyncStorage.getItem('user');
      if (userValue !== null) {
        setUser({ data: JSON.parse(userValue) });
      }
    } catch (e) {
      console.log('Failed to fetch the user data from storage');
    }
  };

  useEffect(() => {
    readData();
    setLoading(false);
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <ApolloProvider client={client}>
      <AuthenticatedContext.Provider value={{ setUser, user }}>
        <NavigationContainer>
          {user ? (
            <MainScreen />
          ) : (
            <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </AuthenticatedContext.Provider>
    </ApolloProvider>
  );
}

export default App;
