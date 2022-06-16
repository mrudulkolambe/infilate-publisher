import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, sendEmailVerification, ActionCodeOperation } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase_config";
import { useRouter } from "next/router";
import { collection, doc, getDocs, increment, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";


const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState()
	const router = useRouter()
	const [totalAmount, setTotalAmount] = useState(0)
	const [advertiserHoldAmount, setAdvertiserHoldAmount] = useState(0)
	const [applyForValidationData, setApplyForValidationData] = useState()
	const [alert, setAlert] = useState('')
	const [withdrawalAmount, setWithdrawalAmount] = useState(0)

	const handleSignOut = () => {
		signOut(auth).then(() => {
			setUser()
			router.push('/')
		}).catch((error) => {
			// An error happened.
		});
	}
	const getTimeData = () => {
		let dateOBJ = new Date()
		let day = dateOBJ.getDate();
		let month = dateOBJ.getMonth() + 1;
		let year = dateOBJ.getFullYear();
		if (day <= 9) {
			day = `0${day}`
		}
		if (month <= 9) {
			month = `0${month}`
		}
		let dateString1 = `${day}-${month}-${year}`
		return dateString1
	}

	const handleSignIn = async (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				const unsub = onSnapshot(doc(db, "publisher_kyc", user.uid), (doc) => {
					user.kyc = doc.data().status
				});
				if (user.emailVerified) {
					setUser(user)
					router.push('/store')
					const q = query(collection(db, "campaign_details"), where("publisher_id", "==", user.uid), where('reached_advertiser_hold', '==', false), where('timestamp', '<=', Date.now()), where('ready_for_withdrawal', '==', 0),
						orderBy('timestamp'));
					let holdAmount = 0
					const querySnapshot = await getDocs(q)
					const arr = [];
					querySnapshot && querySnapshot.forEach(async (document) => {
						let obj = document.data()
						obj.id = document.id
						arr.push(obj);
						holdAmount += obj.revenue
						let docRef = doc(db, "campaign_details", obj.id);
						await updateDoc(docRef, {
							reached_advertiser_hold: true,
						})
					})
					setApplyForValidationData(arr)
					const docRef = doc(db, "publisher_database", user.uid);
					if (holdAmount !== 0) {
						await updateDoc(docRef, {
							advertiserAmount: holdAmount,
							applied_for_verification: false,
							validationData: arr
						})
							.then(async () => {
								setAlert('Your wallet has been updated, Please check!')
							});
						setAdvertiserHoldAmount(holdAmount)
					} else {
						const unsub = onSnapshot(doc(db, "publisher_database", user.uid), (document) => {
							setAdvertiserHoldAmount(document.data().advertiserAmount)
						});
					}
				} else {
					router.push('/verification')
					setAlert('Verification Email sent to your email! Also check your spam folder')
				}
			})
			.catch((error) => {
				console.log(error.message)
				setAlert(error.message)
			});
	}

	useEffect(() => {
		if (user && user.emailVerified) {
			manageData(user)
		}
	}, [user]);

	const manageData = async (user) => {
		const q = query(collection(db, "campaign_details"), where("publisher_id", "==", user.uid), where('ready_for_withdrawal', '>', 0), where('completed_withdrawal', '==', false));
		const querySnapshot = await getDocs(q)
		const arr = [];
		let finalAmount = 0
		querySnapshot.forEach(async (document) => {
			let obj = document.data()
			obj.id = document.id
			arr.push(obj);
			finalAmount += document.data().ready_for_withdrawal
			console.log(document.data())
			arr.push(document.data())
		})
		arr && arr.forEach(async (data) => {
			let docRef = doc(db, "campaign_details", data.id);
			await updateDoc(docRef, {
				completed_withdrawal: true,
			})
			let docRef2 = doc(db, 'publisher_database', user.uid)
			console.log(data.ready_for_withdrawal)
			await updateDoc(docRef2, {
				advertiserAmount: 0,
				applied_for_verification: false,
				withdraw_data: arr,
				withdrawal_amount: increment(data && data.ready_for_withdrawal)
			})
		})
		setWithdrawalAmount(finalAmount)
		setApplyForValidationData(arr)
		const docRef = doc(db, "publisher_database", user.uid);
		if (finalAmount !== 0) {
			setWithdrawalAmount(finalAmount)
		} else {
			const unsub = onSnapshot(doc(db, "publisher_database", user.uid), (document) => {
				setAdvertiserHoldAmount(document.data().advertiserAmount)
				setWithdrawalAmount(document.data().withdrawal_amount)
			});
		}
	}

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				if (user.emailVerified) {
					const unsub = onSnapshot(doc(db, "publisher_kyc", user.uid), (doc) => {
						user.kyc = doc.data().status
					});
					console.log(user)
					setUser(user)
				}
				else {
					router.push('/verification')
					sendEmailVerification(user)
						.then(() => {
							setAlert('Verification Email sent to your email! Also check your spam folder')
						});
				}
			}
			else {
				router.push('/')
			}
		});
	}, []);

	const handleSignUp = (email, password, name, phone) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user)
				updateProfile(user, {
					displayName: name,
					phoneNumber: phone
				}).then(async () => {
					console.log(user)
					await setDoc(doc(db, "publisher_database", user.uid), { username: name, email: user.email, uid: user.uid, phone: phone })
				}).catch((error) => {
					console.log(error)
				});
			})
			.catch((error) => {
				setAlert(error.message)
			});
	}

	useEffect(() => {
		if (alert.length !== 0) {
			setTimeout(() => {
				setAlert('')
			}, 3000);
		}
	}, [alert]);

	return (
		<AuthContext.Provider value={{ auth, handleSignIn, user, handleSignOut, handleSignUp, alert, setAlert, totalAmount, setTotalAmount, advertiserHoldAmount, setUser, applyForValidationData, withdrawalAmount, setWithdrawalAmount }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext);
}
