import React from 'react';
import styled from 'styled-components/native';

import { Label } from '../typography';
import { sdgs } from '../../data/sdgs';
import { colors } from '../../constants/colors';

const SdgListItemContainer = styled.TouchableOpacity`
  height: 35px;
  justify-content: center;
  background-color: ${({ color }) => (color ? color : null)};
  border-radius: 20px;
  padding: 0 10px;
`;

function SdgListItem({ number, onPress, style }) {
  const info = sdgs.find((sdg) => sdg.number === number);

  return (
    <SdgListItemContainer color={info.color} onPress={() => onPress()} style={style}>
      <Label color={colors.white} variant={3}>
        #{number} {info.name}
      </Label>
    </SdgListItemContainer>
  );
}

export default SdgListItem;
