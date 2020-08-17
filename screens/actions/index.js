import { ActivityIndicator } from 'react-native';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';

import { AuthenticatedContext } from '../../context/authenticated-context';
import Screen from '../../components/screen';
import { api } from '../../data';
import Checkbox from '../../components/checkbox';

function ActionsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [actions, setActions] = useState([]);
  const [completedActions, setCompletedActions] = useState([]);

  const authContext = useContext(AuthenticatedContext);
  const id = authContext.user.data.id;
  const token = authContext.user.token;

  useEffect(() => {
    axios
      .all([
        axios.get(`${api}/actions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`${api}/entries?user=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ])
      .then(
        axios.spread((res1, res2) => {
          setActions(res1.data);
          const entries = res2.data;
          const completedActionIds = entries.map((entry) => entry.action.id);
          setCompletedActions(completedActionIds);
          setLoading(false);
        })
      )
      .catch((error) => {
        alert(error.response.data.error);
        console.log('An error occurred:', error.response);
      });
  }, []);

  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        actions.map((action, i) => {
          const isCompleted = completedActions.includes(action.id);

          return (
            <Checkbox
              key={i}
              title={action.title}
              isCompleted={isCompleted}
              onPress={() =>
                navigation.navigate('Action', {
                  action: action,
                  isCompleted: isCompleted,
                  completedActions: completedActions,
                })
              }
            />
          );
        })
      )}
    </Screen>
  );
}

export default ActionsScreen;
