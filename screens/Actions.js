import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Chip } from 'react-native-paper';
import { View, ScrollView } from 'react-native';

import { Checkbox } from '../components/Checkbox';
import { Body } from '../components/Typography';
import { colors } from '../constants/colors';
import { useUser } from '../hooks/useUser';
import { sdgs } from '../constants/sdgs';

const GET_USER_ACTIONS = gql`
  query GetUserActions($id: ID!) {
    allActions {
      id
      title
      image {
        publicUrlTransformed
      }
      content {
        document
      }
      relatedSdgs {
        sdgNo
      }
      categories {
        title
      }
    }
    allCompletions(where: { user: { id: $id } }) {
      action {
        id
      }
      user {
        id
      }
    }
    allCategories {
      title
    }
  }
`;

function Actions({ navigation }) {
  const user = useUser();
  const [sdgFilter, setSdgFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);

  const { loading, error, data = {} } = useQuery(GET_USER_ACTIONS, { variables: { id: user.id } });

  if (loading) return <Body>Loading...</Body>;
  if (error) return <Body>Error! ${error.message}</Body>;

  const { allActions, allCompletions, allCategories } = data;
  const myCompletions = allCompletions.map((completion) => completion.action?.id);

  return (
    <View style={{ padding: 10, height: '100%' }}>
      <View style={{ marginBottom: 5, flexDirection: 'row' }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {allCategories.map((category) => (
            <Chip
              key={category.title}
              mode="outlined"
              height={30}
              textStyle={{ color: colors.black, fontSize: 14, fontFamily: 'OpenSans_600SemiBold' }}
              selected={category.title === categoryFilter}
              style={{
                alignItems: 'center',
                backgroundColor: category.title === categoryFilter ? colors.yellow : colors.grey,
                margin: 5,
              }}
              onClose={category.title === categoryFilter ? () => setCategoryFilter(null) : null}
              onPress={() => {
                setCategoryFilter(category.title);
              }}
            >
              {category.title}
            </Chip>
          ))}
        </ScrollView>
      </View>
      <View style={{ marginBottom: 10, flexDirection: 'row' }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sdgs.map((item, index) => {
            return (
              <Chip
                key={index}
                mode="outlined"
                height={30}
                textStyle={{ color: colors.white, fontSize: 14, fontFamily: 'OpenSans_600SemiBold' }}
                selected={item.sdgNo === sdgFilter}
                style={{
                  backgroundColor: item.color,
                  alignItems: 'center',
                  marginHorizontal: 5,
                }}
                onClose={item.sdgNo === sdgFilter ? () => setSdgFilter(null) : null}
                onPress={() => {
                  setSdgFilter(item.sdgNo);
                }}
              >
                {'SDG ' + item.sdgNo}
              </Chip>
            );
          })}
        </ScrollView>
      </View>
      <ScrollView>
        {allActions
          .filter((action) => {
            const relatedSdgIds = action.relatedSdgs.map((sdg) => sdg.sdgNo); //returns array of the relatedSdgs ids
            const relatedCategoryNames = action.categories.map((category) => category.title); //returns array of the relatedCategory titles
            if (sdgFilter && categoryFilter) {
              // if the relatedSdgs includes the current sdgs filter
              if (relatedSdgIds.includes(sdgFilter) && relatedCategoryNames.includes(categoryFilter)) return action;
            } else if (sdgFilter) {
              if (relatedSdgIds.includes(sdgFilter)) return action;
            } else if (categoryFilter) {
              // if the relatedCategoryNames includes the current category filter
              if (relatedCategoryNames.includes(categoryFilter)) return action;
            } else {
              return action;
            }
          })
          .map((action) => {
            const isCompleted = myCompletions.includes(action.id);

            return (
              <Checkbox
                key={action.id}
                title={action.title}
                isCompleted={isCompleted}
                onPress={() => navigation.navigate('Action', { action, isCompleted })}
              />
            );
          })}
      </ScrollView>
    </View>
  );
}

export { Actions, GET_USER_ACTIONS };
