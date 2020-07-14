import React, { useState } from 'react';
import { Text, Button } from 'react-native';

import { firebase } from '../../firebase/config';
import Screen from '../../components/screen';

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
    <Screen style={{ justifyContent: 'center' }}>
      <Text>Home!</Text>
      <Button onPress={() => fetchUsers()} title="Show users collection" />
    </Screen>
  );
}

export default HomeScreen;
