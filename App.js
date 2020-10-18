import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import {
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';

import { AuthenticatedContext } from './context/authenticated-context';
import LoginScreen from './screens/login';
import MainScreen from './screens/main';
import RegistrationScreen from './screens/registration';
import client from './utils/apolloClient';
import AsyncStorage from '@react-native-community/async-storage';
import { headerStyling } from './constants/headerStyling';

const Stack = createStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState();

  const readAsyncStore = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');

      if (user !== null) {
        setUser({ data: JSON.parse(user) });
      }

      if (token !== null) {
        setToken(token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    readAsyncStore();
    setLoading(false);
  }, []);

  if (!fontsLoaded || loading) {
    return <AppLoading />;
  }

  return (
    <ApolloProvider client={client}>
      <AuthenticatedContext.Provider value={{ setUser, user }}>
        <NavigationContainer>
          {user ? (
            <MainScreen />
          ) : (
            <Stack.Navigator screenOptions={headerStyling}>
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
