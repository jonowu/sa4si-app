import React, { useContext, useState } from 'react';
import _ from 'lodash';
import { ActivityIndicator, Text } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { useIsFocused } from '@react-navigation/native';

import { AuthenticatedContext } from '../../context/authenticated-context';
import { sdgs } from '../../data/sdgs';
import ButtonGroup from '../../components/button-group';
import Screen from '../../components/screen';
import Visualisation from '../../components/visualisation';

function ProfileStatsScreen({ navigation }) {
  const authContext = useContext(AuthenticatedContext);
  const username = authContext.user.data.username;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttons = ['You', 'All Users'];

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
    const { entries } = data;

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
      <Screen centeredHorizontally>
        <ButtonGroup
          onPress={(value) => setSelectedIndex(value)}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 30 }}
        />

        {userSdgCount.length > 0 && (
          <Visualisation data={visualisationData} navigation={navigation} selectedIndex={selectedIndex} />
        )}
      </Screen>
    );
  }
}

export default ProfileStatsScreen;
