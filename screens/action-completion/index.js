import React from 'react';
import { View, FlatList, Dimensions, Image } from 'react-native';
import styled from 'styled-components/native';
import { sdgs } from '../../data/sdgs';
import Screen from '../../components/screen';
import share from '../../utils/share';
import Button from '../../components/button';
import Confetti from '../../components/confetti';
import { colors } from '../../constants/colors';
import { Body, Heading, Subheading } from '../../components/typography';

const ThankYouContainer = styled.View`
  margin: 25px 0px 40px 0px;
  padding: 20px 15px;
  border-radius: 12px;
  background-color: #343642;
  align-items: center;
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
      <Heading variant={2} color={colors.yellow}>
        Thank You!
      </Heading>
      <Body style={{ textAlign: 'center' }} color={colors.white} adjustsFontSizeToFit numberOfLines={2}>
        Congratulations on completing this action!
      </Body>
      <Subheading style={{ textAlign: 'center' }} color={colors.white} adjustsFontSizeToFit numberOfLines={2}>
        {title}
      </Subheading>
      <Body style={{ textAlign: 'center' }} color={colors.white} adjustsFontSizeToFit numberOfLines={2}>
        Keep up the great work!
      </Body>
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
                <Heading color={colors.black} variant={3}>
                  Contributed to these SDGs:{' '}
                </Heading>
                <Body variant={5}>For more information on an SDG, click on it to learn more!</Body>
              </View>
            </>
          }
          style={{ width: '100%', paddingHorizontal: 25 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          data={relatedSdgs}
          renderItem={({ item }) => <Item sdg={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          ListFooterComponent={<Button title="Share Action" onPress={() => share(title)} />}
          ListFooterComponentStyle={{ margin: 30 }}
        />
      )) || (
        <>
          <ThankYou title={title} margin={25} />
          <Button title="Share Action" onPress={() => share(title)} />
        </>
      )}
    </Screen>
  );
}

export default ActionCompletionScreen;
