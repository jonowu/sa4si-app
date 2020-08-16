import { Text, ScrollView } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

import Screen from '../../components/screen';

const HeaderContainer = styled.View`
  background-color: ${({ color }) => color};
`;

const Heading = styled.Text`
  color: white;
  padding: 60px 20px;
  font-size: 20px;
  font-weight: 700;
  margin-top: -20px; // should match the margin-top value of BodyContainer
`;

const BodyContainer = styled.View`
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  margin-top: -20px; // so that the container overlaps
`;

function Sdg({ route }) {
  const { sdg } = route.params;

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <HeaderContainer color={sdg.color}>
          <Heading>
            {sdg.number}. {sdg.name}
          </Heading>
        </HeaderContainer>
        <BodyContainer>
          <Text>{sdg.description}</Text>
        </BodyContainer>
      </ScrollView>
    </Screen>
  );
}

export default Sdg;
