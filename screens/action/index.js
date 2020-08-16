import React, { useContext } from 'react';
import { Text, Button } from 'react-native';
import axios from 'axios';

import Screen from '../../components/screen';
import { AuthenticatedContext } from '../../context/authenticated-context';
import SdgListItem from '../../components/sdg-list-item';
import { api } from '../../data';

function ActionScreen({ route, navigation }) {
  const { action, completedActions } = route.params;
  const { id, title, body, relatedSdgs } = action;

  const authContext = useContext(AuthenticatedContext);
  const userId = authContext.user.data.id;
  const token = authContext.user.token;

  function completeAction() {
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
  }

  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>{title}</Text>
      <Text>{body}</Text>
      {relatedSdgs && <Text>Related Sdgs: </Text>}
      {relatedSdgs && relatedSdgs.map((sdgNo, i) => <SdgListItem key={i} number={sdgNo} />)}
      <Button title="Mark as complete" onPress={() => completeAction()} />
    </Screen>
  );
}

export default ActionScreen;
