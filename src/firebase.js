import firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_vJJ6yYzv4NgWwTxuNvGauB65sTpbSqE",
  authDomain: "datcord-140c3.firebaseapp.com",
  databaseURL: "https://datcord-140c3.firebaseio.com",
  projectId: "datcord-140c3",
  storageBucket: "datcord-140c3.appspot.com",
  messagingSenderId: "391032926323",
  appId: "1:391032926323:web:af0b09ee6de8949d0bba06",
  measurementId: "G-N91B4B4XN4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default db;
