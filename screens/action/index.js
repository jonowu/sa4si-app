import React from 'react';
import { Text, Button } from 'react-native';

import { firebase } from '../../firebase/config';
import Screen from '../../components/screen';

function ActionScreen({ route }) {
  const { id, title, body, userId, completedActions } = route.params;

  console.log(completedActions);
  function completeAction() {
    const newCompletedActions = completedActions.push(id);

    const db = firebase.firestore;

    db()
      .collection('users')
      .doc(userId)
      .update({
        completedActions: db.FieldValue.arrayUnion(id),
      });

    console.log(newCompletedActions);
  }

  return (
    <Screen style={{ justifyContent: 'center' }}>
      <Text>{title}</Text>
      <Text>{body}</Text>
      <Text>{userId}</Text>
      <Button title="Mark as complete" onPress={() => completeAction()} />
    </Screen>
  );
}

export default ActionScreen;
