//firebase.js
import firebase from "firebase/compat/app"
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB044iLZOmQGKrfvDo4HtcC56-wIrxD7HU",
  authDomain: "diary-f95ca.firebaseapp.com",
  databaseURL: "https://diary-f95ca-default-rtdb.firebaseio.com",
  projectId: "diary-f95ca",
  storageBucket: "diary-f95ca.appspot.com",
  messagingSenderId: "566017766228",
  appId: "1:566017766228:web:e020135776249733950ec1"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// const app = initializeApp(firebaseConfig);
export const auth = getAuth();

const google = new GoogleAuthProvider();
const facebook = new FacebookAuthProvider();

export const loginGoogle = () => {
  return signInWithPopup(auth, google);
};

export const loginFacebook = () => {
  return signInWithPopup(auth, facebook);
};

export {firestore};