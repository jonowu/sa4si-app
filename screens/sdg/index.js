import { Text } from 'react-native';
import React from 'react';

import Screen from '../../components/screen';

function Sdg({ route }) {
  const { sdg } = route.params;

  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>Goal {sdg.number}</Text>
      <Text>{sdg.name}</Text>
      <Text>{sdg.description}</Text>
    </Screen>
  );
}

export default Sdg;
