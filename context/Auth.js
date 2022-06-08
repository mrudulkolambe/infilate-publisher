import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase_config";
import { secondaryAuth } from "./firebase_config2";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";



const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState()
	const router = useRouter()

	const handleSignOut = () => {
		signOut(auth).then(() => {
			setUser()
			router.push('/')
		}).catch((error) => {
			// An error happened.
		});
	}

	const handleSignIn = (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setUser(user)
				router.push('/store')
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	}
	const handleSignUp = (email, password, name) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user)
				updateProfile(user, {
					displayName: name
				}).then(async() => {
					console.log(user)
					await setDoc(doc(db, "publisher_database", user.uid), {username: name, email: user.email, uid: user.uid })
					.then(() => {
						router.push('/')
					})
				}).catch((error) => {
					console.log(error)
				});
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
			});

	}

	return (
		<AuthContext.Provider value={{ auth, handleSignIn, user, handleSignOut, handleSignUp }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext);
}
