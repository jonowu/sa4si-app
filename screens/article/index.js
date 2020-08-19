import React from 'react';
import Markdown from 'react-native-markdown-display';
import Moment from 'moment';
import styled from 'styled-components/native';

import ChildScreen from '../../components/child-screen';

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 4px;
`;

const Heading = styled.Text`
  text-align: left;
  font-size: 28px;
  font-weight: 700;
  flex: 2;
`;

const Date = styled.Text`
  text-align: right;
  flex: 1;
`;

const Article = ({ route }) => {
  const { article } = route.params;
  const { title, created_at, body, image } = article;

  return (
    <ChildScreen headerImage={{ uri: image.formats.small.url }}>
      <HeaderContainer>
        {title && <Heading>{title}</Heading>}
        {created_at && <Date>{Moment(created_at).format('DD/MM/YYYY')}</Date>}
      </HeaderContainer>
      {body && <Markdown>{body}</Markdown>}
    </ChildScreen>
  );
};

export default Article;
