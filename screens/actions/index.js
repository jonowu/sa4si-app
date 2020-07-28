import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { firebase } from '../../firebase/config';
import Screen from '../../components/screen';

function ActionsScreen({ navigation }) {
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
        <CheckBox
          key={i}
          center
          title={action.title}
          onPress={() =>
            navigation.navigate('Action', {
              title: action.title,
              body: action.body,
            })
          }
        />
      ))}
    </Screen>
  );
}

export default ActionsScreen;