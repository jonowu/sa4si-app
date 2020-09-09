import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Screen from '../../components/screen';
import tempDisplayPhoto from '../../assets/icon.png'; // temp profile icon

const BoldText = styled.Text`
  font-weight: bold;
  font-size: 19px;
`;

const LeaderboardContainer = styled.View`
  width: 100%;
`;

const LeaderboardPodium = styled.View`
  margin: 20px;
  flex-direction: row;
`;

const LeaderboardPodiumItem = styled.View`
  width: 33%;
  align-items: center;
`;

const PodiumProfilePhoto = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  margin-top: 25px;
  margin-bottom: 10px;
  tint-color: #dbdad8;
`;

const PodiumRanking = styled.View`
  position: absolute;
  right: 0px;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background: #dc2d28;
  align-items: center;
  justify-content: center;
`;

const LeaderboardList = styled.View`
  margin: 20px;
  padding: 40px 25px 25px 25px;
  border-radius: 12px;
  background: #343642;
  align-items: center;
`;

const LeaderboardItemContainer = styled.View`
  width: 100%;
  height: 60px;
  margin-bottom: 15px;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  flex-direction: row;
`;

const ItemRanking = styled.View`
  width: 15%;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#DBDAD8')};
  align-items: center;
  justify-content: center;
`;

const ItemPhotoContainer = styled.View`
  width: 20%;
  align-items: center;
  justify-content: center;
  padding-left: 15px;
`;

const ItemProfilePhoto = styled.Image`
  width: 55px;
  height: 55px;
  border-radius: 27.5px;
  tint-color: #dbdad8;
`;

const ItemTextContainer = styled.View`
  width: 65%;
  flex-direction: row;
  padding-left: 15px;
`;

const ItemName = styled.View`
  width: 80%;
  justify-content: center;
`;

const ItemCount = styled.View`
  width: 20%;
  align-items: center;
  justify-content: center;
`;

function PodiumItem({ data, index }) {
  let ranking = '';
  if (index == 0) {
    ranking = '1st';
  } else if (index == 1) {
    ranking = '2nd';
  } else {
    ranking = '3rd';
  }
  return (
    <LeaderboardPodiumItem>
      <PodiumRanking>
        <BoldText style={{ fontSize: 14, color: 'white' }}>{ranking}</BoldText>
      </PodiumRanking>
      <PodiumProfilePhoto source={tempDisplayPhoto} />
      <BoldText adjustsFontSizeToFit numberOfLines={2} style={{ width: '90%', textAlign: 'center' }}>
        {data.name}
      </BoldText>
    </LeaderboardPodiumItem>
  );
}

function LeaderboardItem({ data, index, current }) {
  const color = current ? '#FEEC00' : '#DBDAD8';
  return (
    <LeaderboardItemContainer>
      <ItemRanking backgroundColor={color}>
        <BoldText style={{ fontSize: 24 }}>{index + 1}</BoldText>
      </ItemRanking>
      <ItemPhotoContainer>
        <ItemProfilePhoto source={tempDisplayPhoto} />
      </ItemPhotoContainer>
      <ItemTextContainer>
        <ItemName>
          <BoldText adjustsFontSizeToFit numberOfLines={2} style={{ fontSize: 18 }}>
            {data.name}
          </BoldText>
        </ItemName>
        <ItemCount>
          <BoldText style={{ fontSize: 14 }}>{data.count}</BoldText>
        </ItemCount>
      </ItemTextContainer>
    </LeaderboardItemContainer>
  );
}

function LeaderboardScreen({ route }) {
  const { leaderboard, userData } = route.params;
  return (
    <Screen>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LeaderboardContainer>
          <LeaderboardPodium>
            {leaderboard &&
              leaderboard.slice(0, 3).map((user, i) => {
                return <PodiumItem data={user} key={i} index={i} />;
              })}
          </LeaderboardPodium>
          <LeaderboardList>
            {leaderboard &&
              leaderboard.slice(0, 10).map((user, i) => {
                const isCurrent = userData.name == user.name;
                return <LeaderboardItem data={user} key={i} index={i} current={isCurrent} />;
              })}
            {userData.ranking > 10 && (
              <LeaderboardItem data={userData} key={10} index={userData.ranking - 1} current={true} />
            )}
          </LeaderboardList>
        </LeaderboardContainer>
      </ScrollView>
    </Screen>
  );
}

export default LeaderboardScreen;
