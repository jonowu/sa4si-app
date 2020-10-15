import React from 'react';
import styled from 'styled-components/native';
import Screen from '../../components/screen';
import Confetti from '../../components/confetti';
import { colors } from '../../constants/colors';
import { Body, Heading } from '../../components/typography';

const ThankYouContainer = styled.View`
  margin: 25px;
  padding-bottom: 15px;
  border-radius: 12px;
  background-color: ${colors.darkgray};
`;

function SubmitIdeaCompletionScreen() {
  return (
    <Screen>
      <Confetti />
      <ThankYouContainer>
        <Heading style={{ margin: 20 }} color={colors.yellow}>
          Thank You!
        </Heading>
        <Body style={{ marginHorizontal: 20, marginVertical: 10 }} color={colors.white}>
          Thanks for sending through your feedback! We’ll make sure to review it and take in your suggestions as soon as
          we can.
        </Body>
        <Body style={{ marginHorizontal: 20, marginVertical: 10 }} color={colors.white}>
          In the meantime, continue to complete actions!
        </Body>
      </ThankYouContainer>
    </Screen>
  );
}

export default SubmitIdeaCompletionScreen;
