import React from 'react';
import Markdown from 'react-native-markdown-display';

import ChildScreen from '../../components/child-screen';

const Sdg = ({ route }) => {
  const { sdg } = route.params;

  return (
    <ChildScreen headerColor={sdg.color} sdgImageSrc={sdg.src}>
      <Markdown>{sdg.body}</Markdown>
    </ChildScreen>
  );
};

export default Sdg;
