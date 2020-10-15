import React, { useContext } from 'react';
import { View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components/native';

import { AuthenticatedContext } from '../../context/authenticated-context';
import share from '../../utils/share';
import Button from '../../components/button';
import ChildScreen from '../../components/child-screen';
import SdgListItem from '../../components/sdg-list-item';
import Checkbox from '../../components/action-checkbox';
import { colors } from '../../constants/colors';
import { Body, Heading, Subheading } from '../../components/typography';

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

function ActionScreen({ route, navigation }) {
  const { action, completedActions, isCompleted } = route.params;
  const { id, title, body, relatedSdgs, image, relatedCategories } = action;

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
    <ChildScreen
      heading={title}
      headerColor={colors.swinRed}
      headerImage={image ? { uri: image.formats.small.url } : null}
    >
      <HeaderContainer>
        <HeaderRow>
          {title && (
            <Heading style={{ flex: 2 }} color={colors.black} variant={3}>
              {title}
            </Heading>
          )}
          <Checkbox
            key={id}
            color={isCompleted ? colors.swinRed : colors.black}
            title={!isCompleted ? 'Complete' : 'Completed'}
            isCompleted={isCompleted}
            onPress={() => completeAction()}
          />
        </HeaderRow>
        {relatedCategories && <Body variant={3}>#{relatedCategories[0].name}</Body>}
      </HeaderContainer>
      <Markdown>{body}</Markdown>
      {relatedSdgs && relatedSdgs.length > 0 && (
        <View style={{ marginTop: 30, marginBottom: 15 }}>
          <Subheading variant={3}>Related SDGs </Subheading>
          <Body variant={5}>For more information on an SDG, click on it to learn more!</Body>
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
