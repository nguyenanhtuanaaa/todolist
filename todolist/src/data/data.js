
import { initializeApp } from "firebase/app";
import{ getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBg1r8o_cgRz2MvmByVX5x7nICoJJizVPg",
  authDomain: "react-8bcae.firebaseapp.com",
  projectId: "react-8bcae",
  storageBucket: "react-8bcae.appspot.com",
  messagingSenderId: "599329665729",
  appId: "1:599329665729:web:c7537cd09e4f42a450da40",
  measurementId: "G-DE4JDW33LQ"
};


const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);