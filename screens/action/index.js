import React, { useContext } from 'react';
import { Text } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { gql, useMutation } from '@apollo/client';

import { AuthenticatedContext } from '../../context/authenticated-context';
import share from '../../utils/share';
import Button from '../../components/button';
import ChildScreen from '../../components/child-screen';
import SdgListItem from '../../components/sdg-list-item';

function ActionScreen({ route, navigation }) {
  const { action, completedActions, isCompleted } = route.params;
  const { id, title, body, relatedSdgs } = action;

  const authContext = useContext(AuthenticatedContext);
  const userId = authContext.user.data.id;

  const shareActionMessage = `I made a difference by completing the action "${title}"!
    Download the #SA4SI app to join me!`;

  const CREATE_ENTRY = gql`
    mutation {
      createEntry(input: { data: { action: ${id}, user: ${userId} } }) {
        entry {
          id
        }
      }
    }
  `;

  const [createEntry] = useMutation(CREATE_ENTRY);

  function completeAction() {
    if (!isCompleted) {
      const newCompletedActions = completedActions.push(id);
      createEntry();
      navigation.navigate('Actions', { completedActions: newCompletedActions });
    }
  }

  return (
    <ChildScreen heading={title} headerColor="green">
      <Markdown>{body}</Markdown>
      {relatedSdgs && relatedSdgs.length > 0 && <Text>Related Sdgs: </Text>}
      {relatedSdgs &&
        relatedSdgs.map((sdg, i) => (
          <SdgListItem
            key={i}
            number={sdg.id}
            onPress={() => navigation.navigate('SDGs', { screen: 'SDG', params: { sdgNo: sdg.id } })}
          />
        ))}
      {!isCompleted ? (
        <Button title="Mark as complete" onPress={() => completeAction()} />
      ) : (
        <Button title="Share Action" onPress={() => share(shareActionMessage)} />
      )}
    </ChildScreen>
  );
}

export default ActionScreen;
