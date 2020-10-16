import React, { useState, useContext } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Moment from 'moment';

import { AuthenticatedContext } from '../../context/authenticated-context';
import { Body, Subheading } from '../../components/typography';
import { colors } from '../../constants/colors';
import ButtonGroup from '../../components/button-group';
import ProfilePicture from '../../components/profile-picture';
import Screen from '../../components/screen';

const TileList = styled.View`
  margin: 20px;
`;

const TileContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 20px;
  display: flex;
`;

const TileImage = styled.Image`
  height: 100px;
  width: 100%;
`;

const TileTextContainer = styled.View`
  background-color: ${colors.lightGrey};
`;

const TileTextTop = styled.View`
  flex-direction: row;
  padding: 0 20px;
`;

const TileAltImage = styled.View`
  height: 47%;
  background-color: #dc2d27;
`;

function KudosButton({ userId, entryId, kudosCount, isKudosGivenByCurrentUser, userIdsThatGaveKudos }) {
  const [isKudosGiven, setKudosGiven] = useState(isKudosGivenByCurrentUser);
  const [noOfKudos, setNoOfKudos] = useState(kudosCount);
  const [kudosUserIds] = useState([...userIdsThatGaveKudos, userId]);

  const UPDATE_KUDOS = gql`
    mutation UpdateKudos($entryId: ID!) {
      updateEntry(input: { where: { id: $entryId }, data: { kudos: [${kudosUserIds.toString()}] } }) {
        entry {
          id
          created_at
          user {
            id
            firstName
            lastName
            username
            profilePicture {
              url
            }
          }
          action {
            id
            title
          }
          kudos {
            id
            username
          }
        }
      }
    }
  `;

  const [updateKudos, { error }] = useMutation(UPDATE_KUDOS);

  if (error) {
    console.error(error);
  }

  return (
    <View>
      <View style={{ borderColor: colors.grey, borderTopWidth: 2, borderBottomWidth: 2, paddingVertical: 8 }}>
        <Text style={{ textAlign: 'center' }}>
          {noOfKudos === 1 ? `${noOfKudos} person gave kudos.` : `${noOfKudos} people gave kudos.`}
        </Text>
      </View>
      <TouchableOpacity
        disabled={isKudosGiven}
        onPress={() => {
          setKudosGiven(true);
          setNoOfKudos(noOfKudos + 1);
          updateKudos({ variables: { entryId: entryId } });
        }}
        style={{
          paddingVertical: 8,
          backgroundColor: colors.lightGrey,
        }}
      >
        {isKudosGiven ? (
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>👏 You gave kudos</Text>
        ) : (
          <Text style={{ textAlign: 'center' }}>👏 Give kudos</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

function FeedScreen({ navigation }) {
  const authContext = useContext(AuthenticatedContext);
  const userId = authContext.user.data.id;

  const buttons = ['News', 'Social'];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const GET_FEED_ENTRIES = gql`
    query GetFeedEntries {
      entries(limit: 10, sort: "created_at:desc") {
        id
        created_at
        user {
          id
          firstName
          lastName
          username
          profilePicture {
            url
          }
        }
        action {
          id
          title
          image {
            formats
          }
        }
        kudos {
          id
          username
        }
      }
      articles(where: { active: true }, limit: 10, sort: "created_at:desc") {
        id
        created_at
        description
        title
        body
        image {
          formats
        }
      }
    }
  `;

  const { loading, error, data = {} } = useQuery(GET_FEED_ENTRIES);
  const { entries, articles } = data;

  if (loading) {
    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </Screen>
    );
  }

  if (error) {
    console.error(error);
    return <Text>Error</Text>;
  }

  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ButtonGroup
        onPress={(value) => setSelectedIndex(value)}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{ height: 30 }}
      />
      {selectedIndex === 0 && (
        <ScrollView style={{ width: '100%' }}>
          <TileList>
            {articles.length > 0 ? (
              articles.map((article, i) => (
                <TileContainer key={i} onPress={() => navigation.navigate('Article', { article: article })}>
                  {article.image ? (
                    <TileImage source={{ uri: article.image.formats.small.url }}></TileImage>
                  ) : (
                    <TileAltImage></TileAltImage>
                  )}
                  <TileTextContainer>
                    <TileTextTop>
                      <Subheading variant={3} style={{ marginTop: 18 }}>
                        {article.title}
                      </Subheading>
                      <Body variant={5} style={{ marginLeft: 'auto', marginTop: 22 }}>
                        {Moment(article.created_at).fromNow()}
                      </Body>
                    </TileTextTop>
                    <Body variant={3} style={{ margin: 20 }}>
                      {article.description}
                    </Body>
                  </TileTextContainer>
                </TileContainer>
              ))
            ) : (
              <Text style={{ fontSize: 20, margin: 20, textAlign: 'center' }}>
                There are no news articles available right now, please check again later!
              </Text>
            )}
          </TileList>
        </ScrollView>
      )}
      {selectedIndex === 1 && (
        <ScrollView style={{ width: '100%' }}>
          <TileList>
            {entries.map((entry, i) => {
              // returns array of user ids that gave kudos
              const userIdsThatGaveKudos = entry.kudos.map((user) => parseInt(user.id));
              // returns true/false depending on whether current user gave kudos
              const isKudosGivenByCurrentUser = userIdsThatGaveKudos.includes(userId);

              return (
                <TileContainer key={i} disabled>
                  {entry.action.image ? (
                    <TileImage source={{ uri: entry.action.image.formats.small.url }} />
                  ) : (
                    <TileImage source={require('../../assets/action_default.png')} />
                  )}
                  <TileTextContainer>
                    <TileTextTop>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('User Profile', {
                            externalUsername: entry.user.username,
                            externalUserId: entry.user.id,
                          })
                        }
                        style={{ flexDirection: 'row' }}
                      >
                        <ProfilePicture
                          source={entry.user.profilePicture?.url ? { uri: entry.user.profilePicture?.url } : null}
                          firstName={entry.user.firstName}
                          lastName={entry.user.lastName}
                          containerStyle={{ marginTop: 10, marginRight: 10 }}
                          size="small"
                        />
                        <Subheading variant={3} style={{ marginTop: 18 }}>
                          {entry.user.username}
                        </Subheading>
                      </TouchableOpacity>
                      <Body variant={5} style={{ marginLeft: 'auto', marginTop: 22 }}>
                        {Moment(entry.created_at).fromNow()}
                      </Body>
                    </TileTextTop>
                    <Body variant={3} style={{ margin: 20 }}>{`I completed the action '${entry.action?.title}'!`}</Body>
                    <KudosButton
                      kudosCount={entry.kudos.length}
                      userId={userId}
                      entryId={entry.id}
                      userIdsThatGaveKudos={userIdsThatGaveKudos}
                      isKudosGivenByCurrentUser={isKudosGivenByCurrentUser}
                    />
                  </TileTextContainer>
                </TileContainer>
              );
            })}
          </TileList>
        </ScrollView>
      )}
    </Screen>
  );
}

export default FeedScreen;
