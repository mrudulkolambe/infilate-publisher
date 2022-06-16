import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./firebase_config";
import { useAuthContext } from "./Auth";


const MainData = createContext();

export function MainDataProvider({ children }) {
	const { user, setTotalAmount } = useAuthContext()
	const [mainData, setMainData] = useState();
	const [paymentData, setPaymentData] = useState()
	const [displayTotalAmount, setDisplayTotalAmount] = useState(0);
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
	useEffect(() => {
	if (user && user.emailVerified) {
			const q = query(collection(db, "campaign_details"), where("publisher_id", "==", user.uid), where('date', '==', getTimeData()), where('reached_advertiser_hold', '==', false));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				let revenue = 0
				const data = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					revenue += obj.revenue
					data.push(obj)
				});
				setTotalAmount(revenue)
			});
			return () => {
				unsubscribe()
			}
		}
	}, [user]);
	useEffect(() => {
	if (user && user.emailVerified) {
			const q = query(collection(db, "campaign_details"), where("publisher_id", "==", user.uid));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const data = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					data.push(obj)
				});
				setMainData(data)
			});
			return () => {
				unsubscribe()
			}
		}
	}, [user]);


	useEffect(() => {
	if (user && user.emailVerified) {
			const q = query(collection(db, "campaign_details"), where('date', '==', getTimeData()));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				let totalRevenue = 0
				const data = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					data.push(obj)
					totalRevenue += obj.revenue
				});
				setDisplayTotalAmount(totalRevenue)
			});
			return () => {
				unsubscribe()
			}
		}
	}, [user]);

	return (
		<MainData.Provider value={{ mainData, paymentData, displayTotalAmount }}>
			{children}
		</MainData.Provider>
	);
}

export function useMainData() {
	return useContext(MainData);
}
