import { Text } from 'react-native';
import React from 'react';
import Moment from 'moment';

import Screen from '../../components/screen';

function Event({ route }) {
  const { event } = route.params;
  return (
    <Screen style={{ justifyContent: 'center' }}>
      <Text>Event {event.number}</Text>
      <Text>{event.name}</Text>
      <Text>{event.description}</Text>
      <Text>Event Start: {Moment(event.start).format('DD/MM/YYYY hh:mm A')}</Text>
      <Text>Event End: {Moment(event.end).format('DD/MM/YYYY hh:mm A')}</Text>
    </Screen>
  );
}

export default Event;
