import React, { useContext } from 'react';
import { ActivityIndicator, Text, View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { gql, useQuery } from '@apollo/client';
import _ from 'lodash';

import { AuthenticatedContext } from '../../context/authenticated-context';
import Screen from '../../components/screen';

const ProfileContainer = styled.View`
  margin: 20px;
  padding: 15px;
  border-radius: 15px;
  overflow: hidden;
  background: #97a9a0;
  align-items: center;
`;

const ProfileStatsContainer = styled.View`
  flex-direction: row;
  margin: 30px 0px;
`;

const ProfileStatsChild = styled.View`
  width: 50%;
  align-items: center;
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

function ProfileScreen() {
  const authContext = useContext(AuthenticatedContext);
  const user = authContext.user.data;
  const username = authContext.user.data.username;

  const GET_STATS = gql`
    query GetAllEntries {
      entries {
        id
        user {
          username
        }
      }
    }
  `;

  const { loading, error, data = {} } = useQuery(GET_STATS);

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
      .map((items, name) => ({ name, count: items.length }))
      .sortBy(entries, 'count')
      .reverse()
      .value();
    const userTotalActions = leaderboard.find((o) => o.name === username).count;
    const userLeaderboardRanking = leaderboard.findIndex((o) => o.name === username) + 1;

    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView style={{ width: '100%' }}>
          <ProfileContainer>
            {user.username && <BoldText style={{ fontSize: 20 }}>{user.username}</BoldText>}
            {user.email && <BoldText style={{ fontSize: 20 }}>{user.email}</BoldText>}
            <ProfileStatsContainer>
              <ProfileStatsChild>
                <BoldText>Position</BoldText>
                {userLeaderboardRanking && <Text>{userLeaderboardRanking} </Text>}
              </ProfileStatsChild>
              <ProfileStatsChild>
                <BoldText>Actions</BoldText>
                {userTotalActions && <Text>{userTotalActions} </Text>}
              </ProfileStatsChild>
            </ProfileStatsContainer>
            <View style={{ margin: 10, alignItems: 'center' }}>
              <BoldText>Leaderboard</BoldText>
              {leaderboard &&
                leaderboard.map((user, i) => {
                  return (
                    <Text key={i}>
                      {i + 1}. {user.name}: {user.count}
                    </Text>
                  );
                })}
            </View>
          </ProfileContainer>
        </ScrollView>
      </Screen>
    );
  }
}

export default ProfileScreen;
