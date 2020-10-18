import React from 'react';
import MarkdownDisplay from 'react-native-markdown-display';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  body: {
    fontFamily: 'OpenSans_400Regular',
  },
  heading1: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 22,
  },
  heading2: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 22,
  },
  heading3: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 20,
  },
  heading4: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 18,
  },
  heading5: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 16,
  },
  heading6: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 14,
  },
  strong: {
    fontWeight: 'normal',
    fontFamily: 'OpenSans_600SemiBold',
  },
  em: {
    fontFamily: 'OpenSans_400Regular_Italic',
  },
});

const Markdown = ({ children }) => <MarkdownDisplay style={styles}>{children}</MarkdownDisplay>;

export default Markdown;
