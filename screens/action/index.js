import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components/native';

import { AuthenticatedContext } from '../../context/authenticated-context';
import share from '../../utils/share';
import Button from '../../components/button';
import ChildScreen from '../../components/child-screen';
import SdgListItem from '../../components/sdg-list-item';
import Checkbox from '../../components/action-checkbox';

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const Heading = styled.Text`
  font-size: 25px;
  font-weight: 700;
  flex: 2;
`;

function ActionScreen({ route, navigation }) {
  const { action, completedActions, isCompleted } = route.params;
  const { id, title, body, relatedSdgs, image } = action;

  const authContext = useContext(AuthenticatedContext);
  const userId = authContext.user.data.id;

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
      navigation.navigate('Action Completion', {
        action: action,
      });
    }
  }

  return (
    <ChildScreen heading={title} headerColor="#DC2D27" headerImage={image ? { uri: image.formats.small.url } : null}>
      <HeaderContainer>
        {title && <Heading>{title}</Heading>}
        <Checkbox
          key={id}
          color={isCompleted ? '#DC2D27' : 'black'}
          title={!isCompleted ? 'Complete' : 'Completed'}
          isCompleted={isCompleted}
          onPress={() => completeAction()}
        />
      </HeaderContainer>
      <Markdown>{body}</Markdown>
      {relatedSdgs && relatedSdgs.length > 0 && (
        <View style={{ marginTop: 30, marginBottom: 15 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Related SDGs </Text>
          <Text style={{ fontSize: 10 }}>For more information on an SDG, click on it to learn more!</Text>
        </View>
      )}
      {relatedSdgs &&
        relatedSdgs.map((sdg, i) => (
          <SdgListItem
            key={i}
            number={sdg.id}
            onPress={() => navigation.navigate('SDGs', { screen: 'SDG', params: { sdgNo: sdg.id } })}
          />
        ))}
      {!isCompleted ? (
        <Button title="Complete" onPress={() => completeAction()} />
      ) : (
        <Button title="Share Action" onPress={() => share(title)} />
      )}
    </ChildScreen>
  );
}

export default ActionScreen;
