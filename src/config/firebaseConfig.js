import {initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
   apiKey: "AIzaSyCi6jB12c54-g8szdw95r98hY2E5ITmgxw",
   authDomain: "shipments-app-4b996.firebaseapp.com",
   projectId: "shipments-app-4b996",
   storageBucket: "shipments-app-4b996.appspot.com",
   messagingSenderId: "973465460268",
   appId: "1:973465460268:web:1271ffa615c1994fd53b89"
};

initializeApp(firebaseConfig);
const db = getFirestore()

export {
   db
}