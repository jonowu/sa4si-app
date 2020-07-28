import React, { useContext } from 'react';
import { Text, Button } from 'react-native';

import { firebase } from '../../firebase/config';
import Screen from '../../components/screen';
import { AuthenticatedContext } from '../../context/authenticated-context';

function ActionScreen({ route, navigation }) {
  const { action, userId, completedActions } = route.params;
  const { id, title, body, relatedSdgs } = action;

  const value = useContext(AuthenticatedContext);

  function completeAction() {
    const newCompletedActions = completedActions.push(id);

    const db = firebase.firestore;

    db()
      .collection('users')
      .doc(userId)
      .update({
        completedActions: db.FieldValue.arrayUnion(id),
      });

    db()
      .collection('users')
      .doc(userId)
      .get()
      .then((document) => {
        const userData = document.data();
        value.setUser(userData);
        navigation.navigate('Actions', { completedActions: newCompletedActions });
      });
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
