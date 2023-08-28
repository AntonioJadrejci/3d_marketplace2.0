import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAiaUvr7Et21jxjSWbNoV1LPa5iMyPM4PM",
    authDomain: "d-marketplace-48212.firebaseapp.com",
    projectId: "d-marketplace-48212",
    storageBucket: "d-marketplace-48212.appspot.com",
    messagingSenderId: "530815210981",
    appId: "1:530815210981:web:2aa5d13603eb38815fcb0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, app, ref, uploadBytes, getDownloadURL };