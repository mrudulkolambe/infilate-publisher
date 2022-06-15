import { doc, getDoc, setDoc } from 'firebase/firestore'
import React from 'react'
import { useAuthContext } from '../context/Auth'
import { db } from '../context/firebase_config'

const CampaignCard = ({ data, setDisplayCard, setDetailsData }) => {
	const { user,setAlert } = useAuthContext()
	const handleNotification = async () => {
		if (user) {
			let doc_id = `${data.id}-${user.uid}`
			let checkDataAvailable;
			const docRef = doc(db, "Notifications", doc_id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				checkDataAvailable = docSnap.data();
			} else {
				checkDataAvailable = undefined;
			}
			if (!checkDataAvailable) {
				await setDoc(doc(db, "Notifications", doc_id), {
					name: user.displayName,
					user_id: user.uid,
					campaign_id: data.id,
					campaign_name: data.campaign_name,
					read: false,
					timestamp: Date.now()
				})
					.then(() => {
						setAlert('You have successfully applied for the campaign')
					})
					.catch((err) => {
						console.log(err)
					})
			}else{
				setAlert('You have already applied for the campaign')
			}
		}
	}
	return (
		<>
			<div className='border shadow-lg p-4 w-72 rounded-lg'>
				<div>
					<img className='rounded-md aspect-video h-36 shadow-md' src={ data && data.img || "https://images.unsplash.com/photo-1595835018349-198460e1d309?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8MTYlM0E5fGVufDB8fDB8fA%3D%3D&w=1000&q=80"} alt="" />
				</div>
				<div className='mt-3'>
					<h1 className='text-xl font-bold w-64 overflow-hidden text-ellipsis whitespace-nowrap my-2'>{data && data.campaign_name}</h1>
					<p className='font-bold w-64 overflow-hidden text-ellipsis whitespace-nowrap'>Advertiser Name: {data && data.advertiser_name}</p>
					<p className='font-bold w-64 overflow-hidden text-ellipsis whitespace-nowrap'>Affiliate Pricing: {data && data.affiliate_pricing}</p>
				</div>
				<button onClick={handleNotification} className='mt-3 bg-gray-900 text-white hover:bg-gray-700 duration-150 rounded-lg font-bold px-3 py-1 w-9/12 mx-1'>Apply  For Campaign</button>
				<button onClick={() => {
					setDisplayCard(true)
					setDetailsData(data)
				}} className='mt-3 text-gray-900 hover:bg-white border border-gray-900 hover:text-gray-700 duration-150 rounded-lg font-bold px-3 py-1 w-2/12 mx-1'>...</button>
			</div>
		</>
	)
}

export default CampaignCard