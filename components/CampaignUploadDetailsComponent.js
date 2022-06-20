import React from 'react'

const CampaignUploadDetailsComponent = ({data}) => {
	return (
		<>
			<div className='mt-6 px-2'>
				<h1 className='my-3 font-bold text-2xl'>Payout Details</h1>
				<div className='text-lg w-full'>
					<div className='mt-5 w-full flex justify-between text-left font-bold my-3'>
						<span className='w-7/12'>Category</span>
						<span className='w-5/12 text-blue-700'>Payout</span>
					</div>
					<div className='w-full flex justify-between text-left font-bold my-3'>
						<span className='w-7/12'>Advertiser Pricing</span>
						<span className='w-5/12 text-blue-700'>{data && data.advertiser_pricing}</span>
					</div>
					<div className='w-full justify-between text-left font-bold my-3 hidden'>
						<span className='w-7/12'>Affilitate Pricing</span>
						<span className='w-5/12 text-blue-700'>500</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default CampaignUploadDetailsComponent