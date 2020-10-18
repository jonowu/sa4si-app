import React from 'react';
import styled from 'styled-components/native';
import Screen from '../../components/screen';
import Confetti from '../../components/confetti';
import { colors } from '../../constants/colors';
import { Subheading, Heading } from '../../components/typography';

const ThankYouContainer = styled.View`
  margin: 25px;
  padding: 15px;
  border-radius: 12px;
  background-color: ${colors.darkgray};
`;

function SubmitIdeaCompletionScreen() {
  return (
    <Screen>
      <Confetti />
      <ThankYouContainer>
        <Heading primary variant={2} style={{ marginBottom: 10 }}>
          Thank You!
        </Heading>
        <Subheading variant={3} color={colors.white}>
          Thanks for sending through your feedback! We’ll make sure to review it and take in your suggestions as soon as
          we can.
        </Subheading>
        <Subheading variant={3} color={colors.white}>
          In the meantime, continue to complete actions!
        </Subheading>
      </ThankYouContainer>
    </Screen>
  );
}

export default SubmitIdeaCompletionScreen;
