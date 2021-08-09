import React from 'react';
import { View } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components/native';

import { Body, Heading } from '../components/Typography';
import { colors } from '../constants/colors';
import { Button } from '../components/Button';
import { ChildScreen } from '../components/ChildScreen';
import { share } from '../utils/share';
import { DocumentRenderer } from '../components/DocumentRenderer';
import { useUser } from '../hooks/useUser';
import { GET_USER_ACTIONS } from '../screens/Actions';
import { GET_COMPLETIONS } from '../screens/Feed';

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

const COMPLETE_ACTION_MUTATION = gql`
  mutation COMPLETE_ACTION($userId: ID!, $actionId: ID!) {
    createCompletion(data: { user: { connect: { id: $userId } }, action: { connect: { id: $actionId } } }) {
      id
      completionDate
      user {
        id
        name
      }
      action {
        id
        title
      }
    }
  }
`;

const Action = ({ route, navigation }) => {
  const { action, isCompleted } = route.params;
  const { title, content, image } = action;
  const user = useUser();

  const [completeAction] = useMutation(COMPLETE_ACTION_MUTATION, {
    variables: { userId: user.id, actionId: action.id },
    refetchQueries: [{ query: GET_USER_ACTIONS, variables: { id: user.id } }, { query: GET_COMPLETIONS }],
    onCompleted: () => {
      navigation.goBack();
    },
  });

  return (
    <ChildScreen heading={title} headerImage={image ? { uri: image.publicUrlTransformed } : null}>
      <HeaderContainer>
        <HeaderRow>
          {title && (
            <Heading style={{ flex: 2 }} color={colors.black} variant={3}>
              {title}
            </Heading>
          )}
        </HeaderRow>
      </HeaderContainer>
      {isCompleted && (
        <Body>
          Well done on participating in {title}! You can use the share button to encourage your friends and family to
          take part as well.
        </Body>
      )}
      {!isCompleted && content?.document ? <DocumentRenderer document={content.document} /> : null}
      <View style={{ marginTop: 10 }}>
        {isCompleted ? (
          <Button
            title="Share Action"
            onPress={() =>
              share(`I made a difference by completing the action "${title}"! Download the #SA4SI app to join me!`)
            }
          />
        ) : (
          <Button title="Complete" onPress={async () => await completeAction()} />
        )}
      </View>
    </ChildScreen>
  );
};

export { Action };
