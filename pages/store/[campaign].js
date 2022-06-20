import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import CampaignUploadDetailsComponent from '../../components/CampaignUploadDetailsComponent'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../context/firebase_config';
import { useAuthContext } from '../../context/Auth';

const Campaign = () => {
	const [campaignData, setCampaignData] = useState();
	const {user} = useAuthContext()
	const router = useRouter()
	const query = router.query.campaign
	useEffect(() => {
		if (query) {
			const unsub = onSnapshot(doc(db, "campaign_data", query), (doc) => {
				let obj = doc.data()
				obj.id = doc.id
				setCampaignData(obj)
			});
			return () => {
				unsub()
			};
		}
	}, [query]);
	return (
		<>
			<div className='hidden lg:block left-position absolute top-20 px-10 py-6 Nunito w-10/12 bg-white z-20'>
				<div onClick={() => { router.back() }} className='flex items-center cursor-pointer mt-7'><MdKeyboardArrowLeft className='mr-1 text-3xl' />  Back to campaign list</div>
				<div className='flex mt-6 sticky'>
					<div className='px-2 w-3/12 flex flex-col justify-between pb-10'>
						<div className='flex flex-col items-center'>
							<img className='h-7/12 w-full aspect-video' src={campaignData && campaignData.img} alt="" />
							<h1 className='mt-2 text-3xl font-bold text-center'>{campaignData && campaignData.campaign_name}</h1>
						</div>
						<div className={user ? 'mt-16 text-sm' : 'hidden'}>
							<h1 className='mb-5 font-bold text-2xl'>POC Info: </h1>
							<h1 className='mt-1'>POC Name: <span className='font-bold'>{campaignData && campaignData.POCNAME}</span></h1>
							<h1 className='mt-1'>POC Email: <span className='font-bold'>{campaignData && campaignData.POCEMAIL}</span></h1>
							<h1 className='mt-1'>POC Phone: <span className='font-bold'>{campaignData && campaignData.POCPHONE}</span></h1>
						</div>
					</div>
					<div className='px-2 w-9/12'>
						<div className='flex'>
							<div className='mx-1 px-8 rounded-lg py-4 w-8/12 border'>Type: {campaignData && campaignData.type}</div>
							<div className='mx-1 px-8 rounded-lg py-4 w-4/12 border'>Active</div>
						</div>
						<div className='flex mt-4'>
							<div className='mx-1 px-8 rounded-lg py-4 w-3/12 border'>CPS</div>
							<div className='mx-1 px-8 rounded-lg py-4 w-6/12 border'>{campaignData && campaignData.advertiser_name}</div>
							<div className='mx-1 px-8 rounded-lg py-4 w-3/12 border'>11</div>
						</div>
						<div className='flex mt-4'>
							<div className='mx-1 px-8 rounded-lg overflow-scroll py-4 w-full h-72 border'>{campaignData && campaignData.campaign_brief}</div>
						</div>
						<CampaignUploadDetailsComponent data={campaignData} />
					</div>
				</div>
			</div>

			<div className='lg:hidden sm:block absolute top-20 px-7 py-3 Nunito w-full bg-white z-20'>
				<div onClick={() => { router.back() }} className='flex items-center cursor-pointer mt-4'><MdKeyboardArrowLeft className='mr-1 text-3xl' />  Back to campaign list</div>
				<div className='flex flex-col mt-6'>
					<div className='px-2 w-full'>
						<div className='flex flex-col items-center'>
							<img className='h-4/6 w-4/6 md:h-3/6 md:w-3/6' src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg" alt="" />
							<h1 className='mt-4 text-3xl font-bold text-center'>Python</h1>
						</div>
					</div>
					<div className='w-full'>
						<div className='flex flex-col'>
							<div className='my-1  px-8 rounded-lg py-4 w-full border'>Payout upto 32%</div>
							<div className='my-1  px-8 rounded-lg py-4 w-full border'>Active</div>
						</div>
						<div className='flex mt-4 flex-col'>
							<div className='my-1  px-8 rounded-lg py-4 w-full border'>Payout upto 32%</div>
							<div className='my-1  px-8 rounded-lg py-4 w-full border'>Payout upto 32%</div>
							<div className='my-1  px-8 rounded-lg py-4 w-full border'>Active</div>
						</div>
						<div className='flex mt-4'>
							<div className=' px-8 rounded-lg overflow-scroll py-4 w-full h-72 border'>Active</div>
						</div>
						<CampaignUploadDetailsComponent data={campaignData} />
					</div>
				</div>
			</div>
		</>
	)
}

export default Campaign