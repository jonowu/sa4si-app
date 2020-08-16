import { Text, Image } from 'react-native';
import React from 'react';
import Moment from 'moment';

import Screen from '../../components/screen';

function Article({ route }) {
  const { article } = route.params;
  const { id, title, description, body, created_at, image } = article;

  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>Article {id}</Text>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <Text>{body}</Text>
      <Text>{Moment(created_at).format('DD/MM/YYYY hh:mm A')}</Text>
      {image && <Image style={{ width: '80%', height: '30%' }} source={{ uri: image.formats.small.url }}></Image>}
    </Screen>
  );
}

export default Article;
