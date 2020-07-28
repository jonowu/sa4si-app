import React, { useState, useEffect, useContext } from 'react';
import { Text } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { firebase } from '../../firebase/config';
import { AuthenticatedContext } from '../../context/authenticated-context';
import Screen from '../../components/screen';

function ActionsScreen({ navigation }) {
  const [actions, setActions] = useState([]);
  const [completedActions, setCompletedActions] = useState([]);

  const value = useContext(AuthenticatedContext);

  useEffect(() => {
    setCompletedActions(value.user.completedActions);

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
              id: action.id,
              userId: value.user.id,
              completedActions: completedActions,
            })
          }
          checked={completedActions.includes(action.id)}
        />
      ))}
    </Screen>
  );
}

export default ActionsScreen;
