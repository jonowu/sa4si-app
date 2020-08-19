import React, { useContext } from 'react';
import { Text, Button } from 'react-native';
import axios from 'axios';
import Markdown from 'react-native-markdown-display';

import ChildScreen from '../../components/child-screen';
import { AuthenticatedContext } from '../../context/authenticated-context';
import SdgListItem from '../../components/sdg-list-item';
import { api } from '../../data';
import share from '../../utils/share';

function ActionScreen({ route, navigation }) {
  const { action, completedActions, isCompleted } = route.params;
  const { id, title, body, relatedSdgs } = action;

  const authContext = useContext(AuthenticatedContext);
  const userId = authContext.user.data.id;
  const token = authContext.user.token;

  const shareActionMessage = `#SA4SI - I made a difference by completing the action "${title}"!
   Download the #SA4SI app to join me!`;

  function completeAction() {
    if (!isCompleted) {
      const newCompletedActions = completedActions.push(id);

      axios({
        method: 'POST',
        url: `${api}/entries`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          action: id,
          user: userId,
        },
      })
        .then(() => {
          navigation.navigate('Actions', { completedActions: newCompletedActions });
        })
        .catch((error) => {
          alert(error.response.data.error);
          console.log('An error occurred:', error.response);
        });
    } else {
      navigation.navigate('Actions');
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
