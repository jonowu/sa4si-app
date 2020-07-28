import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { sdgs } from '../../data';
import Screen from '../../components/screen';

function SdgsScreen({ navigation }) {
  return (
    <Screen style={{ justifyContent: 'center' }}>
      <Text>Tap on an SDG to learn more!</Text>
      {sdgs.map((sdg, i) => (
        <TouchableOpacity key={i} onPress={() => navigation.navigate('SDG', { sdg: sdg })}>
          <Text>{sdg.name}</Text>
        </TouchableOpacity>
      ))}
    </Screen>
  );
}

export default SdgsScreen;
