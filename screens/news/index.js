import { Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import Moment from 'moment';
import styled from 'styled-components/native';

import { AuthenticatedContext } from '../../context/authenticated-context';
import Screen from '../../components/screen';
import { api } from '../../data';

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
  background-color: palegreen;
`;

const TileText = styled.View`
  height: 53%;
  color: black;
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
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  const authContext = useContext(AuthenticatedContext);
  const token = authContext.user.token;

  useEffect(() => {
    axios
      .get(`${api}/articles?_sort=created_at:ASC`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.data.error);
        console.log('An error occurred:', error.response);
      });
  }, []);

  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large"></ActivityIndicator>
      ) : (
        <ScrollView style={{ width: '100%' }}>
          <Text style={{ padding: 5, textAlign: 'center' }}>Tap on an article to learn more!</Text>
          <TileList>
            {news.map((article, i) => (
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
            ))}
          </TileList>
        </ScrollView>
      )}
    </Screen>
  );
}

export default NewsScreen;
