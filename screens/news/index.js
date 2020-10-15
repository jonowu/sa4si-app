import React from 'react';
import Moment from 'moment';
import styled from 'styled-components/native';
import { gql, useQuery } from '@apollo/client';
import { Text, ScrollView, ActivityIndicator } from 'react-native';

import Screen from '../../components/screen';
import { colors } from '../../constants/colors';
import { Body } from '../../components/typography/index';

const TileList = styled.View`
  margin: 20px;
`;

const TileContainer = styled.TouchableOpacity`
  height: 250px;
  width: 100%;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const TileImage = styled.Image`
  height: 47%;
`;

const TileAltImage = styled.View`
  height: 47%;
  background-color: ${colors.swinRed};
`;

const TileText = styled.View`
  height: 53%;
  background-color: ${colors.grey};
`;

const TileTextTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

function NewsScreen({ navigation }) {
  const GET_ARTICLES = gql`
    query GetArticles {
      articles(where: { active: true }) {
        id
        created_at
        description
        title
        body
        image {
          formats
        }
      }
    }
  `;

  const { loading, error, data = {} } = useQuery(GET_ARTICLES);
  const { articles } = data;

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

  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView style={{ width: '100%' }}>
        <Body variant={4} style={{ padding: 5, textAlign: 'center' }}>
          Tap on an article to learn more!
        </Body>
        <TileList>
          {articles.length > 0 ? (
            articles.map((article, i) => (
              <TileContainer key={i} onPress={() => navigation.navigate('Article', { article: article })}>
                {article.image ? (
                  <TileImage source={{ uri: article.image.formats.small.url }}></TileImage>
                ) : (
                  <TileAltImage></TileAltImage>
                )}
                <TileText>
                  <TileTextTop>
                    <Body style={{ fontWeight: 'bold', fontSize: 22, marginLeft: 20, marginTop: 15 }}>
                      {article.title}
                    </Body>
                    <Body style={{ fontSize: 12, marginRight: 20, marginTop: 25 }}>
                      {Moment(article.created_at).format('DD/MM/YY')}
                    </Body>
                  </TileTextTop>
                  <Body style={{ fontSize: 17, margin: 20 }}>{article.description}</Body>
                </TileText>
              </TileContainer>
            ))
          ) : (
            <Body variant={1} style={{ margin: 20, textAlign: 'center' }}>
              There are no news articles available right now, please check again later!
            </Body>
          )}
        </TileList>
      </ScrollView>
    </Screen>
  );
}

export default NewsScreen;
