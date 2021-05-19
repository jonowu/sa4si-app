/* eslint-disable react/no-children-prop */
/* eslint-disable react/display-name */
import { Heading, Body } from './Typography';
import { Linking } from 'react-native';
import React from 'react';

export const renderers = {
  inline: {
    bold: { fontWeight: 'bold' },
    code: {},
    keyboard: {},
    strikethrough: {},
    italic: { fontStyle: 'italic' },
    link: ({ children, href }) => {
      return (
        <Body style={{ color: 'blue' }} onPress={() => Linking.openURL(href)}>
          {children}
        </Body>
      );
    },
    subscript: {},
    superscript: {},
    underline: { textDecorationLine: 'underline' },
    relationship: ({ data }) => {
      return <Body>{data?.label}</Body>;
    },
  },
  block: {
    block: ({ children, textAlign }) => {
      return <Body style={{ textAlign }}>{children}</Body>;
    },
    blockquote: ({ children, textAlign }) => {
      return <Body style={{ textAlign }}>{children}</Body>;
    },
    paragraph: ({ children, textAlign }) => {
      return <Body style={{ textAlign }}>{children}</Body>;
    },
    divider: () => {
      return <Body>Divider goes here</Body>;
    },
    heading: ({ level, children, textAlign }) => {
      return <Heading variant={level} style={{ textAlign }} children={children} />;
    },
    code: 'pre',
    list: ({ children, type }) => {
      const List = type === 'ordered' ? 'ol' : 'ul';
      return (
        <List>
          {children.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </List>
      );
    },
    layout: ({ children, layout }) => {
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: layout.map((x) => `${x}fr`).join(' '),
          }}
        >
          {children}
        </div>
      );
    },
  },
};

const DocumentNode = ({ node: _node, componentBlocks, renderers }) => {
  if (typeof _node.text === 'string') {
    let child = <>{_node.text}</>;
    Object.keys(renderers.inline).forEach((markName) => {
      if (markName !== 'link' && markName !== 'relationship' && _node[markName]) {
        const Mark = renderers.inline[markName];
        child = <Body style={{ ...Mark }}>{child}</Body>;
      }
    });

    return child;
  }

  const node = _node;
  const children = node.children.map((x, i) => (
    <DocumentNode node={x} componentBlocks={componentBlocks} renderers={renderers} key={i} />
  ));
  switch (node.type) {
    case 'blockquote': {
      return <renderers.block.blockquote children={children} />;
    }
    case 'paragraph': {
      return <renderers.block.paragraph textAlign={node.textAlign} children={children} />;
    }
    case 'code': {
      if (node.children.length === 1 && node.children[0] && typeof node.children[0].text === 'string') {
        return <renderers.block.code>{node.children[0].text}</renderers.block.code>;
      }
      break;
    }
    case 'layout': {
      return <renderers.block.layout layout={node.layout} children={children} />;
    }
    case 'divider': {
      return <renderers.block.divider />;
    }
    case 'heading': {
      return <renderers.block.heading textAlign={node.textAlign} level={node.level} children={children} />;
    }
    case 'ordered-list':
    case 'unordered-list': {
      return <renderers.block.list children={children} type={node.type === 'ordered-list' ? 'ordered' : 'unordered'} />;
    }
    case 'relationship': {
      const data = node.data;
      return (
        <renderers.inline.relationship
          data={
            data
              ? {
                  id: data.id,
                  label: data.label || data.id,
                  data: data.data || {},
                }
              : null
          }
        />
      );
    }
    case 'link': {
      return <renderers.inline.link href={node.href}>{children}</renderers.inline.link>;
    }
  }
  return <>{children}</>;
};

const DocumentRenderer = ({ document }) => (
  <>
    {document.map((x, i) => (
      <DocumentNode node={x} renderers={renderers} key={i} />
    ))}
  </>
);

export { DocumentRenderer };
