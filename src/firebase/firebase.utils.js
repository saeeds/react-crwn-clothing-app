import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCGQuWphNsunTjrUd8lTfOVdhxD91WwaQY",
  authDomain: "crwn-db-97fd9.firebaseapp.com",
  databaseURL: "https://crwn-db-97fd9.firebaseio.com",
  projectId: "crwn-db-97fd9",
  storageBucket: "",
  messagingSenderId: "651152718046",
  appId: "1:651152718046:web:2fcd4a7f19f1137ce16a4f",
  measurementId: "G-NKF6JY59HM"
};

export const createUserProfileDocument = async (userAuth, addtionalData) => {
  if (!userAuth) return;
  const userRef =  firestore.doc(`users/${userAuth.uid}`);
 
  
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addtionalData
      })
    } catch (error) {
        console.log('error creating user', error.message);
        
    } 
  }
  return userRef;
}
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;