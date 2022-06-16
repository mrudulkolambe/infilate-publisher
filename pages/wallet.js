import { doc, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import HeadComponent from '../components/HeadComponent'
import { useAuthContext } from '../context/Auth'
import { db } from '../context/firebase_config'
import { useMainData } from '../context/Main'
import PaymentTableRow from '../components/PaymentTableRow'
import { collection, query, where, onSnapshot } from "firebase/firestore";

const PaymentWallet = () => {
	const { totalAmount, advertiserHoldAmount, applyForValidationData, user, setAlert, withdrawalAmount } = useAuthContext()
	const [paymentDetails, setPaymentDetails] = useState();
	const handleVerificationClick = async () => {
	if (user && user.emailVerified) {
			let doc_id = user.uid
			let campaignIdList = []
			let campaignNameList = []
			console.log(doc_id)
			applyForValidationData && applyForValidationData.forEach((data) => {
				campaignIdList.push(data.campaign_id)
				campaignNameList.push(data.campaign_name)
			})
			if (advertiserHoldAmount > 0) {
				await setDoc(doc(db, "Notifications", doc_id), {
					name: user.displayName,
					user_id: user.uid,
					campaign_id_list: campaignIdList.join(', '),
					campaign_name: campaignNameList.join(', '),
					amount: advertiserHoldAmount,
					read: false,
					timestamp: Date.now()
				})
					.then(async () => {
						const docRef = doc(db, "publisher_database", user.uid);
						await updateDoc(docRef, {
							applied_for_verification: true
						})
							.then(() => {
								setAlert(`Wait for 24 hours!.  You have successfully applied for verification with amount: Rs ${advertiserHoldAmount}`)
							})
					})
			}
		}
	}
	useEffect(() => {
	if (user && user.emailVerified) {
			const q = query(collection(db, "payment"), where("uid", "==", user.uid));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const arr = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					arr.push(obj);
				});
				setPaymentDetails(arr)
			});
		}
	}, [user]);

	const handleClickNow = async () => {
		if (user && user.kyc === 'Approved') {
			await setDoc(doc(db, "payment", user.uid), {
				name: user.displayName,
				uid: user.uid,
				amount: withdrawalAmount,
				completed: false,
				type: 'now'
			})
				.then(() => {
					setAlert('Your payment will be dispersed in the upcoming saturday')
				})
		} else {
			setAlert('Apply for KYC first!')
		}
	}

	const handleClickLater = async () => {
		if (user && user.kyc === 'Approved') {
			await setDoc(doc(db, "payment", user.uid), {
				name: user.displayName,
				uid: user.uid,
				amount: withdrawalAmount,
				completed: false,
				type: 'later'
			})
				.then(() => {
					setAlert('Your payment will be dispersed in next month')
				})
		} else {
			setAlert('Apply for KYC first!')
		}
	}
	return (
		<>
			<HeadComponent title={'Payment Wallet'} />
			<div className='hidden lg:block left-position absolute top-20 px-10 py-6 Nunito w-10/12'>
				<div className='flex justify-between items-center'>
					<h2 className='text-4xl font-bold'>Wallet</h2>
				</div>
				<div className='w-full flex'>
					<div className='w-3/12 p-2'>
						<h2>Balance Details</h2>
						<div className='bg-gray-200 w-full rounded-lg shadow-lg p-3'>
							<div className='bg-white rounded-t-lg flex flex-col p-3 border-b border-gray-400' >
								<h2 className='text-gray-500 text-sm'>On Hold</h2>
								<h2 className='text-lg font-bold'>{totalAmount}</h2>
							</div>
							<div className='bg-white flex flex-col p-3 border-b border-gray-400' >
								<h2 className='text-gray-500 text-sm'>Advertiser Hold</h2>
								<h2 className='text-lg font-bold'>{advertiserHoldAmount}</h2>
							</div>
							<div className='bg-white flex flex-col p-3' >
								<h2 className='text-gray-500 text-sm'>Ready for Withdrawal</h2>
								<h2 className='text-lg font-bold'>{withdrawalAmount}</h2>
							</div>
							<div className='flex flex-col mt-2'>
								{
									withdrawalAmount == 0 ? <button onClick={handleVerificationClick} className='px-2 py-1 bg-white rounded-lg font-bold hover:bg-gray-100 duration-300'>Withdraw</button> : <div>
										<button onClick={handleClickNow} className='px-2 py-1 bg-white rounded-lg font-bold hover:bg-gray-100 duration-300'>Withdraw Now</button>
										<button onClick={handleClickLater} className='px-2 py-1 bg-white rounded-lg font-bold hover:bg-gray-100 duration-300'>Withdraw Later</button>
									</div>
								}
								{/* <button className='px-2 py-1 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-700 duration-300 mt-2'>Payment History</button> */}
							</div>
						</div>
					</div>
					<div className='w-9/12 p-2'>
						<h1 className='text-center font-bold text-lg mb-3'>Payment History</h1>
						{
							paymentDetails && paymentDetails.map((data) => {
								return <PaymentTableRow data={data} key={data.id} />
							})
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default PaymentWallet