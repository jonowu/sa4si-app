import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useFonts } from 'expo-font';
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import {
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import client from './utils/apolloClient';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';

import { Root } from './screens/Root';

const App = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ApolloProvider>
    );
  }
};

export default App;
