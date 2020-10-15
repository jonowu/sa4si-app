import React from 'react';
import Markdown from 'react-native-markdown-display';
import Moment from 'moment';
import styled from 'styled-components/native';

import ChildScreen from '../../components/child-screen';
import { colors } from '../../constants/colors';
import { Heading, Body } from '../../components/typography/index';

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 4px;
`;

const Article = ({ route }) => {
  const { article } = route.params;
  const { title, created_at, body, image } = article;

  return (
    <ChildScreen
      heading={title}
      headerColor={colors.swinRed}
      headerImage={image ? { uri: image.formats.small.url } : null}
    >
      <HeaderContainer>
        {title && (
          <Heading variant={2} color={colors.black}>
            {title}
          </Heading>
        )}
        {created_at && (
          <Body variant={4} style={{ flex: 1, textAlign: 'right' }}>
            {Moment(created_at).format('DD/MM/YYYY')}
          </Body>
        )}
      </HeaderContainer>
      {body && <Markdown>{body}</Markdown>}
    </ChildScreen>
  );
};

export default Article;
