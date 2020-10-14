import { ActivityIndicator, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components/native';

import { AuthenticatedContext } from '../../context/authenticated-context';
import Screen from '../../components/screen';
import Checkbox from '../../components/actions-checkbox';

const ActionsContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

function ActionsScreen({ navigation }) {
  const authContext = useContext(AuthenticatedContext);
  const id = authContext.user.data.id;

  const [completedActions, setCompletedActions] = useState([]);

  const GET_USER_ACTIONS = gql`
    query GetUserActions {
      actions(where: { active: true }) {
        id
        title
        body
        relatedSdgs {
          id
        }
        image { 
          formats
        }
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
      <Screen centeredHorizontally centeredVertically>
        <ActivityIndicator size="large" />
      </Screen>
    );
  }

  if (error) {
    console.error(error);
    return <Text>Error: {JSON.stringify(error)}</Text>;
  }

  return (
    <Screen scrollable centeredHorizontally centeredVertically>
      <ActionsContainer>
        {actions.length > 0 ? (
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
        ) : (
          <Text style={{ fontSize: 20, margin: 20, textAlign: 'center' }}>
            There are no actions available right now, please check again later!
          </Text>
        )}
      </ActionsContainer>
    </Screen>
  );
}

export default ActionsScreen;
