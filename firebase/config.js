import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDe6dKDga5C2jHxvEcw9mRKDHEQ-xbfokI',
  authDomain: 'sustainability-app-demo.firebaseapp.com',
  databaseURL: 'https://sustainability-app-demo.firebaseio.com',
  projectId: 'sustainability-app-demo',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
