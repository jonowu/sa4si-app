import React from 'react';
import { Text, Button } from 'react-native';

import Screen from '../../components/screen';

function ActionScreen({ route }) {
  const { title } = route.params;
  const { body } = route.params;

  return (
    <Screen style={{ justifyContent: 'center' }}>
      <Text>{title}</Text>
      <Text>{body}</Text>
      <Button title="Mark as complete" />
    </Screen>
  );
}

export default ActionScreen;
