import { Text, Image, FlatList, Dimensions } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

import { sdgs } from '../../data/sdgs';
import Screen from '../../components/screen';

const TileContainer = styled.TouchableOpacity`
  height: ${Math.floor(Dimensions.get('window').height / 4)}px;
  width: ${Math.floor(Dimensions.get('window').width / 2.2)}px;
  justify-content: center;
  align-items: center;
`;

const numColumns = 2;

function SdgsScreen({ navigation }) {
  const Item = ({ sdg }) => (
    <TileContainer onPress={() => navigation.navigate('SDG', { sdgNo: sdg.id })}>
      <Image source={sdg.src} resizeMode="contain" style={{ height: '100%', width: '100%' }} />
    </TileContainer>
  );

  return (
    <Screen style={{ alignItems: 'center' }}>
      <Text style={{ padding: 5 }}>Tap on an SDG to learn more!</Text>
      <FlatList
        style={{ width: '100%', paddingHorizontal: 10 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        data={sdgs}
        renderItem={({ item }) => <Item sdg={item} />}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />
    </Screen>
  );
}

export default SdgsScreen;
