import { CheckBox } from 'react-native-elements';
import { Text } from 'react-native';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';

import { AuthenticatedContext } from '../../context/authenticated-context';
import Screen from '../../components/screen';
import { api } from '../../data';

function ActionsScreen({ navigation }) {
  const [actions, setActions] = useState([]);
  const [completedActions, setCompletedActions] = useState([]);

  const authContext = useContext(AuthenticatedContext);
  const id = authContext.user.data.id;
  const token = authContext.user.token;

  useEffect(() => {
    axios
      .get(`${api}/actions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setActions(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
        console.log('An error occurred:', error.response);
      });

    axios
      .get(`${api}/entries?user=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const entries = response.data;
        const completedActionIds = entries.map((entry) => entry.action.id);
        setCompletedActions(completedActionIds);
      })
      .catch((error) => {
        alert(error.response.data.error);
        console.log('An error occurred:', error.response);
      });
  }, []);

  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>Actions!</Text>
      {actions.map((action, i) => (
        <CheckBox
          key={i}
          center
          title={action.title}
          onPress={() =>
            navigation.navigate('Action', {
              action: action,
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
