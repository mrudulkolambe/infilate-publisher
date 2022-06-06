import React from 'react'

const CampaignCard = ({ setDetailsData, setDisplayCard }) => {
	return (
		<>
			<div className='border shadow-lg p-4 w-72 rounded-lg'>
				<div>
					<img className='rounded-md aspect-video h-36 shadow-md' src="https://images.unsplash.com/photo-1595835018349-198460e1d309?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8MTYlM0E5fGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
				</div>
				<div className='mt-3'>
					<h1 className='text-xl font-bold w-64 overflow-hidden text-ellipsis whitespace-nowrap my-2'>Python</h1>
					<p className='font-bold w-72 overflow-hidden text-ellipsis whitespace-nowrap'>Advertiser Name: Python INC.</p>
					<p className='font-bold w-72 overflow-hidden text-ellipsis whitespace-nowrap'>Affiliate Pricing: 500</p>
				</div>
				<button className='mt-3 bg-gray-900 text-white hover:bg-gray-700 duration-150 rounded-lg font-bold px-3 py-1 w-9/12 mx-1'>Apply  For Campaign</button>
				<button onClick={() => { setDisplayCard(true) }} className='mt-3 text-gray-900 hover:bg-white border border-gray-900 hover:text-gray-700 duration-150 rounded-lg font-bold px-3 py-1 w-2/12 mx-1'>...</button>
			</div>
		</>
	)
}

export default CampaignCard