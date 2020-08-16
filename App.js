import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';

import { AuthenticatedContext } from './context/authenticated-context';
import LoginScreen from './screens/login';
import MainScreen from './screens/main';
import RegistrationScreen from './screens/registration';

const Stack = createStackNavigator();

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  const readData = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem('token');
      const userValue = await AsyncStorage.getItem('user');

      if (tokenValue !== null && userValue !== null) {
        setUser({ data: JSON.parse(userValue), token: tokenValue });
      }
    } catch (e) {
      alert('Failed to fetch the data from storage');
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
  );
}

export default App;
