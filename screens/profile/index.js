import React, { useContext } from 'react';
import { ActivityIndicator, Text, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { gql, useQuery } from '@apollo/client';
import _ from 'lodash';
import tempDisplayPhoto from '../../assets/icon.png'; // temp profile icon
import { useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthenticatedContext } from '../../context/authenticated-context';
import Screen from '../../components/screen';

const ProfileContainer = styled.View`
  margin: 20px;
  border-radius: 12px;
  background: #343642;
  align-items: center;
`;

const ProfilePhoto = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-top: 30px;
  margin-bottom: 10px;
  tint-color: white;
`;

const ProfileStatsContainer = styled.View`
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: 20px;
  width: 100%;
`;

const ProfileStatsChild = styled.View`
  width: 50%;
  align-items: center;
`;

const BoldText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${({ color }) => (color ? color : 'white')};
`;

const ProfileButtonsContainer = styled.View`
  margin-bottom: 30px;
  width: 100%;
  align-items: center;
`;

const ProfileButton = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin: 10px 0px;
  padding: 8px 15px;
  flex-direction: row;
  align-items: center;
`;

const ProfileButtonText = styled.Text`
  left: 20px;
  font-size: 17px;
  font-weight: bold;
`;

const profileOptionList = [
  {
    title: 'Leadership Board',
    iconName: 'star-circle-outline',
    screen: 'Leaderboard',
  },
  {
    title: 'Submit Idea',
    iconName: 'comment-question-outline',
    screen: '',
  },
];

function ProfileStats({ userData }) {
  return (
    <ProfileStatsContainer>
      <ProfileStatsChild>
        <BoldText color="#DC2D28">Position</BoldText>
        {userData.ranking && <Text style={{ color: 'white' }}>{userData.ranking} </Text>}
      </ProfileStatsChild>
      <ProfileStatsChild>
        <BoldText color="#DC2D28">Actions</BoldText>
        {userData.count && <Text style={{ color: 'white' }}>{userData.count} </Text>}
      </ProfileStatsChild>
    </ProfileStatsContainer>
  );
}

function ProfileButtons({ userData, leaderboard, navigation }) {
  return (
    <ProfileButtonsContainer>
      {profileOptionList.map((item, i) => (
        <ProfileButton
          key={i}
          onPress={() =>
            item.screen ? navigation.navigate(item.screen, { leaderboard: leaderboard, userData: userData }) : null
          }
        >
          <MaterialCommunityIcons name={item.iconName} size={35} color="black" />
          <ProfileButtonText>{item.title}</ProfileButtonText>
        </ProfileButton>
      ))}
    </ProfileButtonsContainer>
  );
}

function ProfileScreen({ navigation }) {
  const isFocused = useIsFocused();
  let fetched = false;
  const authContext = useContext(AuthenticatedContext);
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

  const { loading, error, data, refetch = {} } = useQuery(GET_STATS);
  if (data && isFocused && !fetched) {
    refetch();
    fetched = true;
  }

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

    const userTotalActions = leaderboard.find((entry) => entry.name === username);
    const actionCount = userTotalActions ? userTotalActions.count : '0';

    const userLeaderboardRanking = leaderboard.findIndex((entry) => entry.name === username);
    const leaderboardRanking = userLeaderboardRanking > -1 ? userLeaderboardRanking + 1 : 'N/A';

    const userData = { name: username, count: actionCount, ranking: leaderboardRanking };

    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView style={{ width: '100%' }}>
          <ProfileContainer>
            <ProfilePhoto source={tempDisplayPhoto} />
            {userData.name && (
              <BoldText style={{ fontSize: 20 }} color="#FEEC04">
                {userData.name}
              </BoldText>
            )}
            <ProfileStats userData={userData} />
            <ProfileButtons userData={userData} leaderboard={leaderboard} navigation={navigation} />
          </ProfileContainer>
        </ScrollView>
      </Screen>
    );
  }
}

export default ProfileScreen;
