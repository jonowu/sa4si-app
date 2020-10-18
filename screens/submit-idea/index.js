import React, { useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';

import { AuthenticatedContext } from '../../context/authenticated-context';
import { Body, Heading, H6 } from '../../components/typography';
import { colors } from '../../constants/colors';
import Button from '../../components/button';
import Screen from '../../components/screen';
import Input from '../../components/input';

const IdeaContainer = styled.View`
  margin: 20px;
  padding: 15px;
  border-radius: 12px;
  background-color: ${colors.darkgray};
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
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always" extraScrollHeight={100}>
        <IdeaContainer>
          <Heading primary style={{ margin: 10 }}>
            Hello {profileInfo.firstName} 👋
          </Heading>
          <Body variant={3} color={colors.white} style={{ marginVertical: 20, marginHorizontal: 10 }}>
            Feel free to drop us a message, request an action, or suggest an improvement! Submit them here, we would
            love to hear from you.
          </Body>
          <Input
            label="What is your message about?"
            value={title}
            onChangeText={(text) => setTitle(text)}
            multiline
            textAlignVertical={'top'}
            numberOfLines={3}
            maxLength={1500}
          />
          <View style={{ padding: 12 }}>
            <H6 color={colors.grey} style={{ marginBottom: 5 }}>
              Tell us about it
            </H6>
            <TextInput
              style={{
                textAlignVertical: 'top',
                padding: 10,
                height: 150,
                backgroundColor: 'white',
                borderBottomWidth: 0,
                borderRadius: 20,
                overflow: 'hidden',
                fontFamily: 'OpenSans_400Regular',
              }}
              underlineColorAndroid="transparent"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              onChangeText={(text) => setBody(text)}
              value={body}
            />
          </View>
          <Button title="Send" onPress={() => SubmitIdea()} />
        </IdeaContainer>
      </KeyboardAwareScrollView>
    </Screen>
  );
}

export default SubmitIdeaScreen;
