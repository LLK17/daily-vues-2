import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDsbDi39fFNeDx3mqlnjd2KXsCDvQ64Ouw",
    authDomain: "daily-vues-2.firebaseapp.com",
    databaseURL: "https://daily-vues-2.firebaseio.com",
    projectId: "daily-vues-2",
    storageBucket: "daily-vues-2.appspot.com",
    messagingSenderId: "667762087935",
    appId: "1:667762087935:web:eda9c9c0e49da55e2d79ca",
    measurementId: "G-BW9NC616S7"
  });

  const db = firebaseApp.firestore()
  db.settings({
    ignoreUndefinedProperties: true,
  })

  export { db }