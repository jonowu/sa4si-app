import { ActivityIndicator, Text, Image, FlatList, Dimensions } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import { gql, useQuery } from '@apollo/client';
import _ from 'lodash';

import { sdgs } from '../../data/sdgs';
import Screen from '../../components/screen';

const TileContainer = styled.TouchableOpacity`
  height: ${Math.floor(Dimensions.get('window').height / 4)}px;
  width: ${Math.floor(Dimensions.get('window').width / 2.2)}px;
  justify-content: center;
  align-items: center;
`;

const numColumns = 2;

const GET_SDGS = gql`
  query GetSdgs {
    sdgs {
      id
      body
    }
  }
`;

function SdgsScreen({ navigation }) {
  const { loading, error, data = {} } = useQuery(GET_SDGS);
  const sdgData = data.sdgs;

  const Item = ({ sdg }) => (
    <TileContainer onPress={() => navigation.navigate('SDG', { sdg: sdg })}>
      <Image source={sdg.src} resizeMode="contain" style={{ height: '100%', width: '100%' }} />
    </TileContainer>
  );

  const mergedSdgs = _.map(sdgs, (item) => {
    return _.assign(item, _.find(sdgData, ['id', item.number]));
  });

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
    <Screen style={{ alignItems: 'center' }}>
      <Text style={{ padding: 5 }}>Tap on an SDG to learn more!</Text>
      <FlatList
        style={{ width: '100%', paddingHorizontal: 10 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        data={mergedSdgs}
        renderItem={({ item }) => <Item sdg={item} />}
        keyExtractor={(item) => item.number}
        numColumns={numColumns}
      />
    </Screen>
  );
}

export default SdgsScreen;
