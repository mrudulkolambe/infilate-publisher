import React from 'react'

const BankerMarketCampaignCard = ({ data, setCurrentCampaign }) => {
	return (
		<>
			<div onClick={() => { setCurrentCampaign(data) }} className='p-2 border rounded-lg shadow-lg w-max h-max'>
				<img className='w-52 aspect-video' src={data && data.img} alt="" />
			</div>
		</>
	)
}

export default BankerMarketCampaignCard