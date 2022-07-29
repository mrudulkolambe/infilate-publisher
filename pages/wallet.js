import { addDoc, arrayUnion, doc, increment, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import HeadComponent from '../components/HeadComponent'
import { useAuthContext } from '../context/Auth'
import { db } from '../context/firebase_config'
import { useMainData } from '../context/Main'
import PaymentTableRow from '../components/PaymentTableRow'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Spinner from '../components/Spinner'
import PaymentCharts from '../components/PaymentCharts'

const PaymentWallet = () => {
	const { user, setAlert, userData } = useAuthContext()
	const [graphDetails, setGraphDetails] = useState();
	const [paymentHistory, setPaymentHistory] = useState();
	const [loading1, setLoading1] = useState(false)
	const [loading2, setLoading2] = useState(false)
	const [loading3, setLoading3] = useState(false)

	useEffect(() => {
		if (user) {
			const q = query(collection(db, "campaign_details"), where("publisher_id", "==", user.uid));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const arr = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					arr.push(obj);
				});
				setPaymentHistory(arr)
			});
			return () => {
				unsubscribe()
			};
		}
	}, [user]);

	useEffect(() => {
		setGraphDetails(paymentHistory && paymentHistory.filter(handleGraph))
	}, [paymentHistory]);

	const handleGraph = (data) => {
		return data.validation_completed
	}

	const handleClickNow = async () => {
		if (user && user.kyc === 'Approved') {
			if (userData.ready_for_withdrawal !== 0) {
				await updateDoc(doc(db, 'publisher_database', user.uid), {
					ready_for_withdrawal: increment(-userData.ready_for_withdrawal),
					paymentCompleted: false,
					requested_withdrawal: {
						amount: userData.ready_for_withdrawal,
						type: 'now'
					}
				})
					.then(() => {
						setAlert('Your payment will be disbursed in upcoming Saturday')
					})
			}
			else {
				setAlert('Withdrawal amount cannot be 0')
			}
		} else {
			setAlert('Apply for KYC first!')
		}
	}

	const handleClickLater = async () => {
		if (user && user.kyc === 'Approved') {
			if (userData.ready_for_withdrawal !== 0) {
				await updateDoc(doc(db, 'publisher_database', user.uid), {
					ready_for_withdrawal: increment(-userData.ready_for_withdrawal),
					paymentCompleted: false,
					requested_withdrawal: {
						amount: userData.ready_for_withdrawal,
						type: 'later'
					}
				})
					.then(() => {
						setAlert('Your payment will be disbursed in upcoming Saturday')
					})
			}
			else {
				setAlert('Withdrawal amount cannot be 0')
			}
		} else {
			setAlert('Apply for KYC first!')
		}
	}


	const verification = async () => {
		if (user.emailVerified) {
			if (userData.advertiserHold !== 0) {
				userData && userData.advertiserHoldData.forEach(async (data) => {
					const docRef = doc(db, "campaign_details", data);
					await updateDoc(docRef, {
						status: 'Verification Pending',
						applied_verification: true
					})
				})
				setAlert('Applied For Validation!')
			} else {
				setAlert('Advertiser Hold Amount should not be 0')
			}
		}
		else {
			setAlert('Your email is not verified!')
		}
	}
	return (
		<>
			<HeadComponent title={'Payment Wallet'} />
			<div className='hidden lg:block left-position absolute top-20 px-10 py-6 Nunito w-10/12 h-calc-height overflow-scroll'>
				<div className='flex justify-between items-center mt-8'>
					<h2 className='text-4xl font-bold'>Wallet</h2>
				</div>
				<div className='w-full flex'>
					<div className='w-3/12 p-2'>
						<h2>Balance Details</h2>
						<div className='bg-gray-200 w-full rounded-lg shadow-lg p-3'>
							<div className='bg-white rounded-t-lg flex flex-col p-3 border-b border-gray-400' >
								<h2 className='text-gray-500 text-sm'>On Hold</h2>
								<h2 className='text-lg font-bold'>{userData && userData.hold || 0}</h2>
							</div>
							<div className='bg-white flex flex-col p-3 border-b border-gray-400' >
								<h2 className='text-gray-500 text-sm'>Advertiser Hold</h2>
								<h2 className='text-lg font-bold'>{userData && userData.advertiserHold || 0}</h2>
							</div>
							<div className='bg-white flex flex-col p-3' >
								<h2 className='text-gray-500 text-sm'>Ready for Withdrawal</h2>
								<h2 className='text-lg font-bold'>{userData && userData.ready_for_withdrawal || 0}</h2>
							</div>
							<div className='flex flex-col mt-2'>
								<button onClick={verification} className='my-1 px-2 py-1 bg-gray-900 rounded-lg font-bold text-white hover:bg-gray-700 duration-300'>{loading1 ? <Spinner /> : 'Request Verification'}</button>
								<button onClick={handleClickNow} className='my-1 px-2 py-1 bg-gray-900 rounded-lg font-bold text-white hover:bg-gray-700 duration-300'>{loading2 ? <Spinner /> : 'Withdraw Now'}</button>
								<button onClick={handleClickLater} className='my-1 px-2 py-1 bg-gray-900 rounded-lg font-bold text-white hover:bg-gray-700 duration-300'>{loading3 ? <Spinner /> : 'Withdraw Later'}</button>
								{/* <button className='px-2 py-1 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-700 duration-300 mt-2'>Payment History</button> */}
							</div>
						</div>
					</div>
					<div className='w-8/12 p-2 m-auto'>
						<PaymentCharts graphDetails={graphDetails} />
					</div>
				</div>
				<div className='w-full p-2'>
					<h1 className='text-center font-bold text-lg mb-3'>Payment History</h1>
					{
						paymentHistory && paymentHistory.map((data) => {
							return <PaymentTableRow data={data} key={data.id} />
						})
					}
				</div>
			</div>
		</>
	)
}

export default PaymentWallet