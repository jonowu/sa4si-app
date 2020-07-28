import React from 'react';
import { Text, Button } from 'react-native';

import { firebase } from '../../firebase/config';
import Screen from '../../components/screen';

function ActionScreen({ route, navigation }) {
  const { action, userId, completedActions } = route.params;
  const { id, title, body, relatedSdgs } = action;

  function completeAction() {
    const newCompletedActions = completedActions.push(id);

    const db = firebase.firestore;

    db()
      .collection('users')
      .doc(userId)
      .update({
        completedActions: db.FieldValue.arrayUnion(id),
      })
      .then(() => navigation.navigate('Actions', { completedActions: newCompletedActions }));
  }

  return (
    <Screen style={{ justifyContent: 'center' }}>
      <Text>{title}</Text>
      <Text>{body}</Text>
      {relatedSdgs && <Text>Related Sdgs: </Text>}
      {relatedSdgs && relatedSdgs.map((sdg, i) => <Text key={i}>{sdg}</Text>)}
      <Button title="Mark as complete" onPress={() => completeAction()} />
    </Screen>
  );
}

export default ActionScreen;
