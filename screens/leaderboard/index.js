import React, { useContext } from 'react';
import { ActivityIndicator, Text, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { gql, useQuery } from '@apollo/client';
import _ from 'lodash';
import Screen from '../../components/screen';
import ProfilePicture from '../../components/profile-picture';
import { AuthenticatedContext } from '../../context/authenticated-context';
import { colors } from '../../constants/colors';
import { Body } from '../../components/typography/index';
import { useNavigation } from '@react-navigation/native';

const LeaderboardContainer = styled.View`
  width: 100%;
`;

const LeaderboardPodium = styled.View`
  margin: 20px;
  flex-direction: row;
`;

const LeaderboardPodiumItem = styled.TouchableOpacity`
  width: 33%;
  align-items: center;
`;

const PodiumRanking = styled.View`
  position: absolute;
  right: 0px;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background: #dc2d28;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const LeaderboardList = styled.View`
  margin: 20px;
  padding: 40px 25px 25px 25px;
  border-radius: 12px;
  background: #343642;
  align-items: center;
`;

const LeaderboardItemContainer = styled.View`
  width: 100%;
  height: 60px;
  margin-bottom: 15px;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  flex-direction: row;
`;

const ItemRanking = styled.View`
  width: 15%;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : colors.grey)};
  align-items: center;
  justify-content: center;
`;

const ItemTextContainer = styled.View`
  width: 65%;
  flex-direction: row;
`;

function getPodiumRanking(index) {
  switch (index) {
    case 0:
      return '1st';
    case 1:
      return '2nd';
    case 2:
      return '3rd';
  }
}

const GET_ENTRIES = gql`
  query GetEntries {
    entries {
      id
      action {
        relatedSdgs {
          id
        }
      }
      user {
        id
        username
        firstName
        lastName
        profilePicture {
          url
        }
      }
    }
  }
`;

function PodiumItem({ data, index }) {
  const navigation = useNavigation();

  return (
    <LeaderboardPodiumItem
      onPress={() => navigation.navigate({ name: 'User Profile', params: { externalUserId: data.id } })}
    >
      <PodiumRanking>
        <Body variant={4} color={colors.white} style={{ fontWeight: 'bold' }}>
          {getPodiumRanking(index)}
        </Body>
      </PodiumRanking>
      <ProfilePicture
        source={data.profilePicture ? { uri: data.profilePicture?.url } : null}
        firstName={data.firstName}
        lastName={data.lastName}
      />
      <Body
        adjustsFontSizeToFit
        numberOfLines={1}
        style={{ width: '90%', textAlign: 'center', fontWeight: 'bold', fontSize: 19 }}
      >
        {data.name}
      </Body>
    </LeaderboardPodiumItem>
  );
}

function LeaderboardItem({ data, index, current }) {
  const navigation = useNavigation();

  const color = current ? colors.yellow : colors.grey;
  return (
    <LeaderboardItemContainer>
      <ItemRanking backgroundColor={color}>
        <Body style={{ fontSize: 24, fontWeight: 'bold' }}>{index + 1}</Body>
      </ItemRanking>
      <ProfilePicture
        source={data.profilePicture ? { uri: data.profilePicture?.url } : null}
        firstName={data.firstName ? data.firstName : '?'}
        lastName={data.lastName ? data.lastName : '?'}
        containerStyle={{ marginTop: 5, marginLeft: 10 }}
        size="medium"
        onPress={() => navigation.navigate({ name: 'User Profile', params: { externalUserId: data.id } })}
      />
      <ItemTextContainer>
        <TouchableOpacity
          onPress={() => navigation.navigate({ name: 'User Profile', params: { externalUserId: data.id } })}
        >
          <Body
            variant={2}
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{ fontWeight: 'bold', marginLeft: 10, marginTop: 18 }}
          >
            {data.name}
          </Body>
        </TouchableOpacity>
        <Body variant={4} style={{ fontWeight: 'bold', marginLeft: 'auto', marginRight: 16, marginTop: 20 }}>
          {data.count}
        </Body>
      </ItemTextContainer>
    </LeaderboardItemContainer>
  );
}

function LeaderboardScreen() {
  const authContext = useContext(AuthenticatedContext);
  const username = authContext.user.data.username;

  const { loading, error, data } = useQuery(GET_ENTRIES);

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

  if (data) {
    const { entries } = data;
    const leaderboard = _(entries)
      .groupBy('user.username')
      .map((entries, name) => {
        return {
          name,
          count: entries.length,
          firstName: entries[0].user.firstName,
          lastName: entries[0].user.lastName,
          profilePicture: entries[0].user.profilePicture,
          id: entries[0].user.id,
        };
      })
      .sortBy(entries, 'count')
      .reverse()
      .value();

    const top3Users = leaderboard.slice(0, 3);
    const top10Users = leaderboard.slice(0, 10);

    const isUserOutsideTop10 = !top10Users.some((user) => user.name === username);
    const currentUserData = leaderboard.find((user) => user.name === username);
    const currentUserRanking = leaderboard.findIndex((user) => user.name === username);

    return (
      <Screen>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <LeaderboardContainer>
            <LeaderboardPodium>
              {top3Users &&
                top3Users.map((user, i) => {
                  return <PodiumItem data={user} key={i} index={i} />;
                })}
            </LeaderboardPodium>
            <LeaderboardList>
              {top10Users &&
                top10Users.map((user, i) => {
                  const isCurrent = username === user.name;
                  return <LeaderboardItem data={user} key={i} index={i} current={isCurrent} />;
                })}
              {currentUserData && currentUserData && isUserOutsideTop10 && (
                <LeaderboardItem data={currentUserData} key={10} index={currentUserRanking} current={true} />
              )}
            </LeaderboardList>
          </LeaderboardContainer>
        </ScrollView>
      </Screen>
    );
  }
}

export default LeaderboardScreen;
