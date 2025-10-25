import { initializeApp } from "firebase/app";

import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-wjhHC8wE3bzaoPD123fdS03brD9B4dM",
  authDomain: "sleepapp-project.firebaseapp.com",
  projectId: "sleepapp-project",
  storageBucket: "sleepapp-project.firebasestorage.app",
  messagingSenderId: "165782357939",
  appId: "1:165782357939:web:3e3639cf61303165bfedc6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 



export { db }

export const firebaseApp = app