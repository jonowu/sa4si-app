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
    if (value.user.completedActions) {
      setCompletedActions(value.user.completedActions);
    }

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
              action: action,
              userId: value.user.id,
              completedActions: completedActions,
            })
          }
          checked={completedActions.includes(action.id)}
          containerStyle={{ width: '100%', margin: 0 }}
        />
      ))}
    </Screen>
  );
}

export default ActionsScreen;
