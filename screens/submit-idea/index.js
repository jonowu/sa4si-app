import React, { useState, useContext } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Screen from '../../components/screen';
import Button from '../../components/button';
import { gql, useMutation } from '@apollo/client';
import { AuthenticatedContext } from '../../context/authenticated-context';
import { colors } from '../../constants/colors';
import { Body } from '../../components/typography/index';

const IdeaContainer = styled.View`
  margin: 20px;
  padding-bottom: 15px;
  border-radius: 12px;
  background-color: ${colors.darkgray};
`;

const TextBox = styled.TextInput`
  margin: 5px 10px 20px 10px;
  border-radius: 5px;
  background-color: ${colors.white};
`;

function SubmitIdeaScreen({ route, navigation }) {
  const { profileInfo } = route.params;
  const authContext = useContext(AuthenticatedContext);
  const userId = authContext.user.data.id;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const CREATE_IDEA = gql`
    mutation Idea($title: String!, $body: String!, $userId: ID!) {
      createIdea(input: { data: { title: $title, body: $body, user: $userId } }) {
        idea {
          id
        }
      }
    }
  `;

  const [createIdea] = useMutation(CREATE_IDEA, { variables: { title, body, userId } });

  function SubmitIdea() {
    if (title === '') {
      alert('Title cannot be empty.');
    } else if (body === '') {
      alert('Body cannot be empty.');
    } else {
      createIdea();
      setTitle('');
      setBody('');
      navigation.navigate('Idea Submitted');
    }
  }

  return (
    <Screen>
      <ScrollView>
        <IdeaContainer>
          <Body color={colors.yellow} style={{ margin: 10, fontWeight: 'bold', fontSize: 30 }}>
            Hello {profileInfo.name} 👋
          </Body>
          <Body variant={3} color={colors.white} style={{ marginVertical: 20, marginHorizontal: 10 }}>
            Feel free to drop us a message, request an action, or suggest an improvement! Submit them here, we would
            love to hear from you.
          </Body>
          <Body variant={3} color={colors.white} style={{ margin: 10 }}>
            What is your message about?
          </Body>
          <TextBox
            value={title}
            onChangeText={(text) => setTitle(text)}
            multiline
            textAlignVertical={'top'}
            numberOfLines={3}
            maxLength={1500}
          />
          <Body variant={3} color={colors.white} style={{ margin: 10 }}>
            Tell us about it
          </Body>
          <TextBox
            value={body}
            onChangeText={(text) => setBody(text)}
            multiline
            textAlignVertical={'top'}
            numberOfLines={9}
            maxLength={1500}
          />
          <Button title="Send" onPress={() => SubmitIdea()} />
        </IdeaContainer>
      </ScrollView>
    </Screen>
  );
}

export default SubmitIdeaScreen;
