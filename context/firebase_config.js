import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAY3_foNiHGbCEjTSIfJQSq5mVVc5-XboQ",
	authDomain: "infilate-a6bdc.firebaseapp.com",
	projectId: "infilate-a6bdc",
	storageBucket: "infilate-a6bdc.appspot.com",
	messagingSenderId: "541657277910",
	appId: "1:541657277910:web:954b899e5f9f573c0bf077",
	measurementId: "G-6RWY52B223"
};


const firstApp = initializeApp(firebaseConfig);
export const auth = getAuth(firstApp);
export const db = getFirestore(firstApp);