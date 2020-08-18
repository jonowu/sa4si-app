import { Text, ScrollView, Image } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Screen from '../../components/screen';

const BodyContainer = styled.View`
  flex: 1;
  padding: 20px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: -20px; // so that the container overlaps
`;

function Sdg({ route }) {
  const { sdg } = route.params;

  return (
    <Screen style={{ backgroundColor: sdg.color }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={require('../../static/img/sdgs/SDG_logo.png')}
          resizeMode="contain"
          style={{ margin: 10, backgroundColor: 'white', height: '7%', width: '95%' }}
        />
        <Image
          source={sdg.src}
          resizeMode="contain"
          style={{ margin: 10, marginTop: -10, height: '25%', width: '40%' }}
        />
        <BodyContainer>
          <Text>{sdg.description}</Text>
        </BodyContainer>
      </ScrollView>
    </Screen>
  );
}

export default Sdg;
