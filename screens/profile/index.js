import React, { useContext } from 'react';
import { ActivityIndicator, Text, ScrollView } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import client from '../../utils/apolloClient';
import styled from 'styled-components/native';

import { AuthenticatedContext } from '../../context/authenticated-context';
import { colors } from '../../constants/colors';
import { Heading, Subheading, Body } from '../../components/typography';
import { sdgs } from '../../data/sdgs';
import ProfilePicture from '../../components/profile-picture';
import Screen from '../../components/screen';
import Visualisation from '../../components/visualisation';

const Container = styled.View`
  background: #343642;
  align-items: center;
  padding-top: 20px;
  margin: 20px;
  border-radius: 12px;
`;

const ProfileInfoContainer = styled.View`
  padding: 20px;
  align-items: center;
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

const profileOptionList = [
  {
    title: 'Leaderboard',
    iconName: 'star-circle-outline',
    screen: 'Leaderboard',
  },
  {
    title: 'Customise Profile',
    iconName: 'account',
    screen: 'Edit Profile',
  },
  {
    title: 'Submit Idea',
    iconName: 'comment-question-outline',
    screen: 'Submit an Idea',
  },
  {
    title: 'Logout',
    iconName: 'logout-variant',
    screen: '',
  },
];

const logout = async (value) => {
  await AsyncStorage.removeItem('user');
  await AsyncStorage.removeItem('token');
  client.resetStore();
  value.setUser(false);
};

function ProfileScreen({ navigation }) {
  const authContext = useContext(AuthenticatedContext);
  const username = authContext.user.data.username;
  const firstName = authContext.user.data.firstName;
  const lastName = authContext.user.data.lastName;

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
          username
        }
      }
      self {
        id
        username
        firstName
        lastName
        profilePicture {
          url
        }
        information
        areasOfInterest
        funFacts
      }
    }
  `;

  const isFocused = useIsFocused();
  let fetched = false;

  const { loading, error, data, refetch = {} } = useQuery(GET_ENTRIES);
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
    const { self } = data;

    const profileInfo = {
      information: self.information,
      funFacts: self.funFacts,
      areasOfInterest: self.areasOfInterest,
      profilePicture: self.profilePicture,
      name: self.firstName,
    };

    const totalSdgActions = _.map(entries, 'action.relatedSdgs').flat();
    const totalSdgCount = _(totalSdgActions)
      .groupBy('id')
      .map((items, x) => ({ y: items.length, x }))
      .value();

    const totalColorFiltered = sdgs.filter(({ number: id1 }) => totalSdgCount.some(({ x: id2 }) => id2 === id1));
    const totalColors = _.map(totalColorFiltered, 'color');

    const userEntries = _.filter(entries, function (entry) {
      return entry != null && entry.user.username == username;
    });
    const userSdgActions = _.map(userEntries, 'action.relatedSdgs').flat();
    const userSdgCount = _(userSdgActions)
      .groupBy('id')
      .map((items, x) => ({ y: items.length, x }))
      .value();

    const userColorFiltered = sdgs.filter(({ number: id1 }) => userSdgCount.some(({ x: id2 }) => id2 === id1));
    const userColors = _.map(userColorFiltered, 'color');

    const visualisationData = {
      totalSdgCount: totalSdgCount,
      userSdgCount: userSdgCount,
      totalColors: totalColors,
      userColors: userColors,
    };

    return (
      <Screen centeredHorizontally centeredVertically>
        <ScrollView style={{ width: '100%' }}>
          {userSdgCount.length > 0 && <Visualisation data={visualisationData} navigation={navigation} />}
          <Container>
            <ProfilePicture
              source={profileInfo.profilePicture?.url ? { uri: profileInfo.profilePicture?.url } : null}
              firstName={firstName}
              lastName={lastName}
              containerStyle={{ marginBottom: 10 }}
              size={120}
            />
            {self.username && <Heading variant={3}>{self.username}</Heading>}
            <ProfileInfoContainer>
              {!_.isEmpty(profileInfo.information) && (
                <>
                  <Subheading variant={2} color={colors.blue}>
                    Bio
                  </Subheading>
                  <Body variant={3} color={colors.white} style={{ textAlign: 'center', marginBottom: 8 }}>
                    {self.information}
                  </Body>
                </>
              )}
              {!_.isEmpty(profileInfo.areasOfInterest) && (
                <>
                  <Subheading variant={2} color={colors.purple}>
                    Areas of Interest
                  </Subheading>
                  <Body variant={3} color={colors.white} style={{ textAlign: 'center', marginBottom: 8 }}>
                    {profileInfo.areasOfInterest}
                  </Body>
                </>
              )}
              {!_.isEmpty(profileInfo.funFacts) && (
                <>
                  <Subheading variant={2} color={colors.green}>
                    Sustainable Fun Facts
                  </Subheading>
                  <Body variant={3} color={colors.white} style={{ textAlign: 'center', marginBottom: 8 }}>
                    {profileInfo.funFacts}
                  </Body>
                </>
              )}
            </ProfileInfoContainer>
            <AuthenticatedContext.Consumer>
              {(value) => (
                <ProfileButtonsContainer>
                  {profileOptionList.map((item, i) => (
                    <ProfileButton
                      key={i}
                      onPress={() =>
                        item.title === 'Logout' ? logout(value) : navigation.navigate(item.screen, { profileInfo })
                      }
                    >
                      <MaterialCommunityIcons name={item.iconName} size={35} color="black" />
                      <Body style={{ fontSize: 17, fontWeight: 'bold', left: 20 }}>{item.title}</Body>
                    </ProfileButton>
                  ))}
                </ProfileButtonsContainer>
              )}
            </AuthenticatedContext.Consumer>
          </Container>
        </ScrollView>
      </Screen>
    );
  }
}

export default ProfileScreen;
