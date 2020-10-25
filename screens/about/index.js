import React from 'react';
import styled from 'styled-components/native';

import { Body } from '../../components/typography';
import ChildScreen from '../../components/child-screen';

const StyledBody = styled(Body)`
  text-align: center;
`;

const About = () => {
  return (
    <ChildScreen heading="About the App">
      <StyledBody variant={4}>
        {`The Swinburne Actions for Sustainability Impact (SA4SI) app was developed over 12 weeks as part of a capstone industry project unit.\n\nThe SA4SI initiative aims to both profile sustainable actions undertaken by the Swinburne community and encourage action on the United Nations Sustainable Development Goals (SDGs).\n\nDeveloped by: Jonathan Wu, Benjamin Yong, Ian Song\n\nDesigned by: Taïs Lildaree`}
      </StyledBody>
    </ChildScreen>
  );
};

export default About;
