import { ActivityIndicator, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import { AuthenticatedContext } from '../../context/authenticated-context';
import Screen from '../../components/screen';
import Checkbox from '../../components/checkbox';

function ActionsScreen({ navigation }) {
  const authContext = useContext(AuthenticatedContext);
  const id = authContext.user.data.id;

  const [completedActions, setCompletedActions] = useState([]);

  const GET_USER_ACTIONS = gql`
    query GetUserActions {
      actions {
        id
        title
        body
      }
      entries(where: { user: { id: ${id} } }) {
        action {
          id
        }
        user {
          id
        }
      }
    }
  `;

  const { loading, error, data = {} } = useQuery(GET_USER_ACTIONS);
  const { actions, entries } = data;

  useEffect(() => {
    if (entries) {
      const completedActionIds = entries.map((entry) => entry.action.id);
      setCompletedActions(completedActionIds);
    }
  }, [data]);

  if (loading) {
    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </Screen>
    );
  }

  if (error) {
    console.error(error);
    return <Text>Error</Text>;
  }

  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      {actions.map((action, i) => {
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
      })}
    </Screen>
  );
}

export default ActionsScreen;
