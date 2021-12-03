import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAnlSZeHUYGWQrhM1HTrXUWCdmydJyOmnc",
    authDomain: "spotify-e4f61.firebaseapp.com",
    projectId: "spotify-e4f61",
    storageBucket: "spotify-e4f61.appspot.com",
    messagingSenderId: "146313881123",
    appId: "1:146313881123:web:b33aee8147ed85acbdb396",
    measurementId: "G-MLL1DRE6WS"
};


const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export default app;