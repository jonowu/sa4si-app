import { Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import styled from 'styled-components';
import Moment from 'moment';

import { events } from '../../data/events';
import Screen from '../../components/screen';

const TileContainer = styled(TouchableOpacity)`
  background-color: #f9aa33;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin: 5px;
  padding: 10px;
`;

const TileDate = styled(Text)`
  color: black;
  font-size: 25px;
`;

const TileTitle = styled(Text)`
  color: white;
  font-size: 25px;
`;

function EventsScreen({ navigation }) {
  return (
    <Screen style={{ justifyContent: 'center' }}>
      <Text style={{ padding: 5 }}>Tap on an Event to learn more!</Text>
      <ScrollView style={{ width: '100%' }}>
        {events.map((event, i) => (
          <TileContainer key={i} onPress={() => navigation.navigate('Event', { event: event })}>
            <TileDate>{Moment(event.start).format('DD/MM/YYYY')}</TileDate>
            <TileTitle>{event.name}</TileTitle>
          </TileContainer>
        ))}
      </ScrollView>
    </Screen>
  );
}

export default EventsScreen;
