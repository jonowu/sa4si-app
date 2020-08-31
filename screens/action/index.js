import React, { useContext } from 'react';
import { Text, Button } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { gql, useMutation } from '@apollo/client';

import ChildScreen from '../../components/child-screen';
import { AuthenticatedContext } from '../../context/authenticated-context';
import SdgListItem from '../../components/sdg-list-item';
import share from '../../utils/share';

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
      {relatedSdgs && <Text>Related Sdgs: </Text>}
      {relatedSdgs && relatedSdgs.map((sdgNo, i) => <SdgListItem key={i} number={sdgNo} />)}
      {!isCompleted ? (
        <Button title="Mark as complete" onPress={() => completeAction()} />
      ) : (
        <Button title="Share Action" onPress={() => share(shareActionMessage)} />
      )}
    </ChildScreen>
  );
}

export default ActionScreen;
