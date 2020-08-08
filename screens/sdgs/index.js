import { Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import styled from 'styled-components';

import { sdgs } from '../../data/sdgs';
import Screen from '../../components/screen';

const TileContainer = styled(TouchableOpacity)`
  background-color: ${(props) => props.color};
  height: 100px;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const TileText = styled(Text)`
  color: white;
  font-size: 25px;
  margin: 5px;
`;

function SdgsScreen({ navigation }) {
  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ padding: 5 }}>Tap on an SDG to learn more!</Text>
      <ScrollView style={{ width: '100%' }}>
        {sdgs.map((sdg, i) => (
          <TileContainer color={sdg.color} key={i} onPress={() => navigation.navigate('SDG', { sdg: sdg })}>
            <TileText adjustsFontSizeToFit numberOfLines={1} allowFontScaling>
              {sdg.name}
            </TileText>
          </TileContainer>
        ))}
      </ScrollView>
    </Screen>
  );
}

export default SdgsScreen;
