import firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAQBD_ePltFW_PrXjFNhiyddYchKIFVMOQ",
  authDomain: "ecommerce-8b619.firebaseapp.com",
  databaseURL: "https://ecommerce-8b619.firebaseio.com",
  projectId: "ecommerce-8b619",
  storageBucket: "ecommerce-8b619.appspot.com",
  messagingSenderId: "371325295596",
  appId: "1:371325295596:web:aeba70df4af1770e25fec9",
};
firebase.initializeApp(firebaseConfig);
// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
