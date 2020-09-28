import React from 'react';
import { Text, View, FlatList, Dimensions, Image } from 'react-native';
import styled from 'styled-components/native';
import { sdgs } from '../../data/sdgs';
import Screen from '../../components/screen';
import Confetti from '../../components/confetti';

const ThankYouContainer = styled.View`
  height: 210px;
  margin: 25px 0px 40px 0px;
  border-radius: 12px;
  background-color: #343642;
  align-items: center;
`;

const ThankYouHeader = styled.Text`
  margin: 15px;
  font-weight: bold;
  font-size: 30px;
  color: #feec00;
`;

const ThankYouDescription = styled.Text`
  margin: 0px 15px;
  font-size: 20px;
  text-align: center;
  color: white;
`;

const TileContainer = styled.TouchableOpacity`
  height: ${Math.floor(Dimensions.get('window').height / 4.3)}px;
  width: ${Math.floor(Dimensions.get('window').width / 2.4)}px;
  justify-content: center;
  align-items: center;
`;

function ThankYou({ title, margin }) {
  return (
    <ThankYouContainer style={{ marginLeft: margin, marginRight: margin }}>
      <ThankYouHeader>Thank You!</ThankYouHeader>
      <ThankYouDescription>Congratulations on completing this action!</ThankYouDescription>
      <ThankYouDescription style={{ fontWeight: 'bold' }}>{title}</ThankYouDescription>
      <ThankYouDescription>Keep up the great work!</ThankYouDescription>
    </ThankYouContainer>
  );
}

function ActionCompletionScreen({ route, navigation }) {
  const { action } = route.params;
  const { title, relatedSdgs } = action;

  const Item = ({ sdg }) => (
    <TileContainer onPress={() => navigation.navigate('SDG', { sdgNo: sdg.id })}>
      <Image source={sdgs[sdg.id - 1].src} resizeMode="contain" style={{ height: '100%', width: '100%' }} />
    </TileContainer>
  );

  return (
    <Screen>
      <Confetti />
      {(relatedSdgs.length > 0 && (
        <FlatList
          ListHeaderComponent={
            <>
              <ThankYou title={title} margin={0} />
              <View style={{ marginBottom: 15 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Contributed to these SDGs: </Text>
                <Text style={{ fontSize: 10 }}>For more information on an SDG, click on it to learn more!</Text>
              </View>
            </>
          }
          style={{ width: '100%', paddingHorizontal: 25 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          data={relatedSdgs}
          renderItem={({ item }) => <Item sdg={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      )) || <ThankYou title={title} margin={25} />}
    </Screen>
  );
}

export default ActionCompletionScreen;
