import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';

const Query = ({ children, query, id }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { id: id },
  });

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) return <Text>Error: {JSON.stringify(error)}</Text>;

  return children({ data });
};

export default Query;
