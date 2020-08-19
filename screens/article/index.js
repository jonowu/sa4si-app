import { Text, Image } from 'react-native';
import React from 'react';

import Moment from 'moment';
import Markdown from 'react-native-markdown-display';
import styled from 'styled-components/native';

import Screen from '../../components/screen';
import { ScrollView } from 'react-native-gesture-handler';

const ArticleHeader = styled.View`
  align-items: center;
  height: 40%;
  margin: 8px;
`;

function Article({ route }) {
  const { article } = route.params;
  const { id, title, description, body, created_at, image } = article;

  return (
    <Screen>
      <ArticleHeader>
        <Text>Article {id}</Text>
        <Text>{title}</Text>
        <Text>{description}</Text>
        <Text>{Moment(created_at).format('DD/MM/YYYY hh:mm A')}</Text>
        {image && <Image style={{ width: '50%', height: '70%' }} source={{ uri: image.formats.small.url }}></Image>}
      </ArticleHeader>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Markdown>{body}</Markdown>
      </ScrollView>
    </Screen>
  );
}

export default Article;
