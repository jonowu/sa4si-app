import React, { useContext } from 'react';
import _ from 'lodash';
import { ActivityIndicator, Text, ScrollView } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components/native';

import { AuthenticatedContext } from '../../context/authenticated-context';
import { colors } from '../../constants/colors';
import { Heading, Subheading, Body, Label } from '../../components/typography';
import client from '../../utils/apolloClient';
import ProfilePicture from '../../components/profile-picture';
import Screen from '../../components/screen';

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
    title: 'Profile Stats',
    iconName: 'chart-donut',
    screen: 'Profile Stats',
  },
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

function ProfileScreen({ navigation, route }) {
  const { externalUserId } = route.params || {};

  const authContext = useContext(AuthenticatedContext);

  const GET_EXTERNAL_USER = gql`
    query GetUser($userId: ID!) {
      user(id: $userId) {
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

  const { loading, error, data, refetch = {} } = useQuery(GET_EXTERNAL_USER, {
    // if an externalUserId is passed in use that, otherwise use the logged in user id
    variables: { userId: externalUserId ? externalUserId : authContext.user.data.id },
  });

  if (data && isFocused && !fetched) {
    refetch();
    fetched = true;
  }
  if (loading) {
    return (
      <Screen centeredHorizontally centeredVertically>
        <ActivityIndicator size="large" />
      </Screen>
    );
  }

  if (error) {
    console.error(error);
    return <Text>Error</Text>;
  }

  if (data) {
    const { user } = data;

    const profileInfo = {
      information: user.information,
      funFacts: user.funFacts,
      areasOfInterest: user.areasOfInterest,
      profilePicture: user.profilePicture,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    };

    return (
      <Screen centeredHorizontally centeredVertically>
        <ScrollView style={{ width: '100%' }}>
          <Container>
            <ProfilePicture
              source={profileInfo.profilePicture?.url ? { uri: profileInfo.profilePicture?.url } : null}
              firstName={profileInfo.firstName}
              lastName={profileInfo.lastName}
              containerStyle={{ marginBottom: 10 }}
              size={120}
            />
            {profileInfo.username && (
              <Heading primary variant={3} style={{ textAlign: 'center' }}>
                {`${_.capitalize(profileInfo.firstName)} ${_.capitalize(profileInfo.lastName)}`}
              </Heading>
            )}
            <ProfileInfoContainer>
              {!_.isEmpty(profileInfo.information) && (
                <>
                  <Subheading bold variant={2} color={colors.blue}>
                    Bio
                  </Subheading>
                  <Body variant={3} color={colors.white} style={{ textAlign: 'center', marginBottom: 8 }}>
                    {profileInfo.information}
                  </Body>
                </>
              )}
              {!_.isEmpty(profileInfo.areasOfInterest) && (
                <>
                  <Subheading bold variant={2} color={colors.purple}>
                    Areas of Interest
                  </Subheading>
                  <Body variant={3} color={colors.white} style={{ textAlign: 'center', marginBottom: 8 }}>
                    {profileInfo.areasOfInterest}
                  </Body>
                </>
              )}
              {!_.isEmpty(profileInfo.funFacts) && (
                <>
                  <Subheading bold variant={2} color={colors.green}>
                    Sustainable Fun Facts
                  </Subheading>
                  <Body variant={3} color={colors.white} style={{ textAlign: 'center', marginBottom: 8 }}>
                    {profileInfo.funFacts}
                  </Body>
                </>
              )}
            </ProfileInfoContainer>
            {!externalUserId && (
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
                        <MaterialCommunityIcons
                          name={item.iconName}
                          size={35}
                          color="black"
                          style={{ marginRight: 10 }}
                        />
                        <Label>{item.title}</Label>
                      </ProfileButton>
                    ))}
                  </ProfileButtonsContainer>
                )}
              </AuthenticatedContext.Consumer>
            )}
          </Container>
        </ScrollView>
      </Screen>
    );
  }
}

export default ProfileScreen;
