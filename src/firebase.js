import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGOLz8QdgUIRX63rgo1x9RXulmWm4ZsQU",
  authDomain: "tg-1-9619a.firebaseapp.com",
  projectId: "tg-1-9619a",
  storageBucket: "tg-1-9619a.appspot.com",
  messagingSenderId: "963649274415",
  appId: "1:963649274415:web:79deaa032f3c3fe6b73cda",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };