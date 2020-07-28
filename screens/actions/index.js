import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

import { firebase } from '../../firebase/config';
import Screen from '../../components/screen';

function ActionsScreen() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection('actions')
      .get()
      .then((querySnapshot) => {
        const actionsFromFirebase = [];
        querySnapshot.forEach((doc) => {
          actionsFromFirebase.push(doc.data());
        });
        setActions(actionsFromFirebase);
      });
  }, []);

  return (
    <Screen style={{ justifyContent: 'center' }}>
      <Text>Actions!</Text>
      {actions.map((action, i) => (
        <Text key={i}>{action.title}</Text>
      ))}
    </Screen>
  );
}

export default ActionsScreen;
