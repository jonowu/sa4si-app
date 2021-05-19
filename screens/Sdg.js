import React from 'react';
import { DocumentRenderer } from '../components/DocumentRenderer';
import { ChildScreen } from '../components/ChildScreen';

const Sdg = ({ route }) => {
  const { sdg } = route.params;
  return (
    <ChildScreen headerColor={sdg.color} sdgImageSrc={sdg.image}>
      {sdg.content?.document ? <DocumentRenderer document={sdg.content.document} /> : null}
    </ChildScreen>
  );
};

export { Sdg };
