import { Image, FlatList, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

import { sdgs } from '../constants/sdgs';
import { useQuery, gql } from '@apollo/client';

const ALL_SDGS_QUERY = gql`
  query {
    allSdgs {
      sdgNo
      title
      description
      content {
        document
      }
    }
  }
`;

const Item = ({ sdg, navigation }) => (
  <TouchableOpacity
    style={{
      height: 150,
      width: 150,
      marginBottom: 10,
    }}
    onPress={() => navigation.navigate('SDG', { sdg })}
  >
    <Image
      source={sdg.image}
      style={{
        height: 150,
        width: 150,
        borderRadius: 30,
      }}
    />
  </TouchableOpacity>
);

const Sdgs = ({ navigation }) => {
  const { loading, error, data } = useQuery(ALL_SDGS_QUERY);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error! ${error.message}</Text>;

  // Merge the sdg data from the server with the hard-coded sdg data.
  const mergedSdgs = sdgs.map((t1) => ({ ...t1, ...data.allSdgs.find((t2) => t2.sdgNo === t1.sdgNo) }));

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ paddingVertical: 5 }}
        data={mergedSdgs}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        renderItem={({ item }) => <Item sdg={item} navigation={navigation} />}
        keyExtractor={(item) => item.sdgNo}
        numColumns={2}
      />
    </View>
  );
};

export { Sdgs };
