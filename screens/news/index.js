import React from 'react';
import Moment from 'moment';
import styled from 'styled-components/native';
import { gql, useQuery } from '@apollo/client';
import { Text, ScrollView, ActivityIndicator } from 'react-native';

import Screen from '../../components/screen';

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
  background-color: #dc2d27;
`;

const TileText = styled.View`
  height: 53%;
  background-color: #e5e5e5;
`;

const TileTextTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TileTextTopDate = styled.Text`
  font-size: 12px;
  margin-right: 20px;
  margin-top: 25px;
`;

const TileTextTopTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-left: 20px;
  margin-top: 15px;
`;

const TileTextDescription = styled.Text`
  font-size: 17px;
  margin: 20px 20px;
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
        <Text style={{ padding: 5, textAlign: 'center' }}>Tap on an article to learn more!</Text>
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
                    <TileTextTopTitle>{article.title}</TileTextTopTitle>
                    <TileTextTopDate>{Moment(article.created_at).format('DD/MM/YY')}</TileTextTopDate>
                  </TileTextTop>
                  <TileTextDescription>{article.description}</TileTextDescription>
                </TileText>
              </TileContainer>
            ))
          ) : (
            <Text style={{ fontSize: 20, margin: 20, textAlign: 'center' }}>
              There are no news articles available right now, please check again later!
            </Text>
          )}
        </TileList>
      </ScrollView>
    </Screen>
  );
}

export default NewsScreen;
