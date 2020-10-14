import React, { useState, useContext } from 'react';
import { Text, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Screen from '../../components/screen';
import Button from '../../components/button';
import { gql, useMutation } from '@apollo/client';
import { AuthenticatedContext } from '../../context/authenticated-context';

const IdeaContainer = styled.View`
  margin: 20px;
  padding-bottom: 15px;
  border-radius: 12px;
  background-color: #343642;
  border-color: red;
`;

const GreetingText = styled.Text`
  margin: 10px;
  font-weight: bold;
  font-size: 30px;
  color: #feec00;
`;

const NormalText = styled.Text`
  color: white;
  font-size: 16px;
  margin: 20px 10px 20px 10px;
`;

const QuestionText = styled.Text`
  color: white;
  font-size: 16px;
  margin: 10px;
`;

const TextBox = styled.TextInput`
  margin: 5px 10px 20px 10px;
  border-radius: 5px;
  background-color: white;
`;

function SubmitIdeaScreen({ route, navigation }) {
  const { userData } = route.params;
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
          <GreetingText>
            Hello {userData.name}
            <Text style={{ color: '#DC2D27' }}>!</Text>
          </GreetingText>
          <NormalText>
            Feel free to leave us a message on how we can improve your experience with the app! Or request for an action
            you think we should create!
          </NormalText>

          <QuestionText>What is your message about?</QuestionText>
          <TextBox
            value={title}
            onChangeText={(text) => setTitle(text)}
            multiline
            textAlignVertical={'top'}
            numberOfLines={3}
            maxLength={1500}
          />
          <QuestionText>Tell us about it</QuestionText>
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
