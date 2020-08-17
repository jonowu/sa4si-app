import React, { useContext } from 'react';
import { Text, Button, ScrollView } from 'react-native';
import axios from 'axios';
import Markdown from 'react-native-markdown-display';

import Screen from '../../components/screen';
import { AuthenticatedContext } from '../../context/authenticated-context';
import SdgListItem from '../../components/sdg-list-item';
import { api } from '../../data';

function ActionScreen({ route, navigation }) {
  const { action, completedActions, isCompleted } = route.params;
  const { id, title, body, relatedSdgs } = action;

  const authContext = useContext(AuthenticatedContext);
  const userId = authContext.user.data.id;
  const token = authContext.user.token;

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
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text>{title}</Text>
        <Markdown>{body}</Markdown>
        {relatedSdgs && <Text>Related Sdgs: </Text>}
        {relatedSdgs && relatedSdgs.map((sdgNo, i) => <SdgListItem key={i} number={sdgNo} />)}
        <Button title="Mark as complete" onPress={() => completeAction()} />
      </ScrollView>
    </Screen>
  );
}

export default ActionScreen;
