import { ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { sdgs } from '../../data/sdgs';
import { Chip } from 'react-native-paper';
import { View, ScrollView } from 'react-native';

import { AuthenticatedContext } from '../../context/authenticated-context';
import Screen from '../../components/screen';
import Checkbox from '../../components/actions-checkbox';
import { H3 } from '../../components/typography';
import { colors } from '../../constants/colors';

function ActionsScreen({ navigation }) {
  const authContext = useContext(AuthenticatedContext);
  const id = authContext.user.data.id;

  const [completedActions, setCompletedActions] = useState([]);
  const [filteredActions, setFilteredActions] = useState([]);
  const [sdgFilter, setSdgFilter] = useState();
  const [categoryFilter, setCategoryFilter] = useState();

  const GET_USER_ACTIONS = gql`
    query GetUserActions {
      actions(where: { active: true }) {
        id
        title
        body
        relatedSdgs {
          id
        }
        relatedCategories {
          name
        }
        image { 
          formats
        }
      }
      entries(where: { user: { id: ${id} } }) {
        action {
          id
        }
        user {
          id
        }
      }
      categories {
        name
      }
    }
  `;

  const { loading, error, data = {} } = useQuery(GET_USER_ACTIONS);
  const { actions, entries, categories } = data;

  useEffect(() => {
    if (entries) {
      const completedActionIds = entries.map((entry) => entry.action.id);
      setCompletedActions(completedActionIds);
    }
  }, [data]);

  useEffect(() => {
    if (actions) {
      const filteredActions = actions.filter((action) => {
        const relatedSdgIds = action.relatedSdgs.map((relatedSdg) => relatedSdg.id); //returns array of the relatedSdgs ids
        const relatedCategoryNames = action.relatedCategories.map((relatedCategory) => relatedCategory.name); //returns array of the relatedSdgs ids

        if (sdgFilter && categoryFilter) {
          //if the relatedSdgs includes the current sdgs filter
          if (relatedSdgIds.includes(sdgFilter.toString()) && relatedCategoryNames.includes(categoryFilter)) {
            return action;
          }
        } else if (sdgFilter) {
          if (relatedSdgIds.includes(sdgFilter.toString())) {
            return action;
          }
        } else if (categoryFilter) {
          //if the relatedCatogoryNames includes the current category filter
          if (relatedCategoryNames.includes(categoryFilter)) return action;
        } else {
          // return all the actions if no filter
          return action;
        }
      });
      setFilteredActions(filteredActions);
    }
  }, [data, sdgFilter, categoryFilter]); // the useEffect will re run if sdgFilter gets updated

  if (loading) {
    return (
      <Screen centeredHorizontally centeredVertically>
        <ActivityIndicator size="large" />
      </Screen>
    );
  }

  if (error) {
    console.error(error);
    return <H3>Error</H3>;
  }

  return (
    <Screen centeredHorizontally centeredVertically>
      <View style={{ marginTop: 5, marginBottom: 5, marginHorizontal: 10, flexDirection: 'row' }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => {
            return (
              <Chip
                key={index}
                mode="outlined"
                height={30}
                textStyle={{ color: 'black', fontSize: 14 }}
                selected={category.name === categoryFilter}
                style={{
                  alignItems: 'center',
                  backgroundColor: category.name === categoryFilter ? colors.yellow : colors.grey,
                  margin: 5,
                }}
                onClose={category.name === categoryFilter ? () => setCategoryFilter(null) : false}
                onPress={() => {
                  setCategoryFilter(category.name);
                }}
              >
                {category.name}
              </Chip>
            );
          })}
        </ScrollView>
      </View>
      <View style={{ marginBottom: 10, marginHorizontal: 10, flexDirection: 'row' }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sdgs.map((item, index) => {
            return (
              <Chip
                key={index}
                mode="outlined"
                height={30}
                textStyle={{ color: 'white', fontSize: 14 }}
                selected={item.number === sdgFilter}
                style={{
                  backgroundColor: item.color,
                  alignItems: 'center',
                  marginHorizontal: 5,
                }}
                onClose={item.number === sdgFilter ? () => setSdgFilter(null) : false}
                onPress={() => {
                  setSdgFilter(item.number);
                }}
              >
                {'SDG ' + item.number}
              </Chip>
            );
          })}
        </ScrollView>
      </View>
      <ScrollView>
        <View>
          {filteredActions && filteredActions.length > 0 ? (
            filteredActions.map((action, i) => {
              const isCompleted = completedActions.includes(action.id);
              return (
                <Checkbox
                  key={i}
                  title={action.title}
                  isCompleted={isCompleted}
                  onPress={() =>
                    navigation.navigate('Action', {
                      action: action,
                      isCompleted: isCompleted,
                      completedActions: completedActions,
                    })
                  }
                />
              );
            })
          ) : (
            <H3 style={{ margin: 20, textAlign: 'center' }}>
              There are no actions matching that filter, please try another!
            </H3>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

export default ActionsScreen;
