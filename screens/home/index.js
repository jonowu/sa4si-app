import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';

import { firebase } from '../../firebase/config';

function HomeScreen() {
  const [users, setUsers] = useState();

  function fetchUsers() {
    const db = firebase.firestore();

    db.collection('users')
      .get()
      .then((querySnapshot) => {
        const usersFromFirebase = [];
        querySnapshot.forEach((doc) => {
          usersFromFirebase.push(doc.data());
        });
        setUsers(usersFromFirebase);
      });
    alert(JSON.stringify(users));
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button onPress={() => fetchUsers()} title="Show users collection" />
    </View>
  );
}

export default HomeScreen;
