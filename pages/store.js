import React from 'react'
import CampaignCard from '../components/CampaignCard'
import HeadComponent from '../components/HeadComponent'
import CampaignUploadDetails from '../components/CampaignUploadDetails'
import { useState } from 'react'
import { useCampaignUpload } from '../context/store'
import Link from 'next/link'

const CampaignUpload = () => {
	const [displayCard, setDisplayCard] = useState(false)
	const [detailsData, setDetailsData] = useState()
	const { campaignData } = useCampaignUpload()
	return (
		<>
			{displayCard ? <CampaignUploadDetails setDisplayCard={setDisplayCard} data={detailsData} /> : null}
			<HeadComponent title={'Campaign Upload'} />
			<div className='hidden lg:block left-position absolute top-20 px-10 py-6 Nunito w-10/12 h-calc overflow-scroll'>
				<div className='flex justify-between items-center'>
					<div className='w-8/12 mx-2 h-40 rounded-lg shadow-lg bg-red-400 p-4 flex flex-col justify-around'>
						<h1 className='text-2xl font-bold'>{"Max Yesterday's Earning"}</h1>
						<span className='mt-3 text-6xl font-extrabold'>0</span>
					</div>
					<div className='w-4/12 mx-2 h-40 rounded-lg shadow-lg bg-red-400 p-4 flex flex-col justify-around'>
						<h1 className='text-2xl font-bold'>KYC Status</h1>
						<Link href={'/publisher-kyc'}><button className='w-max text-white font-bold bg-gray-900 px-3 py-1 duration-200 rounded-lg hover:bg-gray-700'>Apply For KYC</button></Link>
					</div>
				</div>
				<div className='grid mt-8 grid-cols-4 gap-y-4'>
					{
						campaignData && campaignData.map((data) => {
							return <CampaignCard key={data.id} data={data} setDetailsData={setDetailsData} setDisplayCard={setDisplayCard} />
						})
					}
				</div>
			</div>

			<div className='lg:hidden sm:block absolute top-20 px-5 py-6 Nunito w-full'>
				<div className='flex flex-col items-center'>
					<div className='w-full mx-2 h-40 rounded-lg shadow-lg bg-red-400 p-4 flex flex-col justify-around'>
						<h1 className='text-2xl font-bold'>{"Max Yesterday's Earning"}</h1>
						<span className='mt-3 text-6xl font-extrabold'>0</span>
					</div>
					<div className='mt-3 w-full mx-2 h-32 rounded-lg shadow-lg bg-red-400 p-4 flex flex-col justify-around'>
						<h1 className='text-2xl font-bold'>KYC Status</h1>
						<button className='w-max text-white font-bold bg-gray-900 px-3 py-1 duration-200 rounded-lg hover:bg-gray-700'>Apply For KYC</button>
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 items-center mt-8 gap-y-8 justify-center place-items-center'>
					<CampaignCard setDetailsData={setDetailsData} setDisplayCard={setDisplayCard} />
					<CampaignCard setDetailsData={setDetailsData} setDisplayCard={setDisplayCard} />
					<CampaignCard setDetailsData={setDetailsData} setDisplayCard={setDisplayCard} />
				</div>
			</div>
		</>
	)
}

export default CampaignUpload