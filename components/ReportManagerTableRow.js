import React from 'react'

const ReportManagerTableRow = ({data, index}) => {
	return (
		<>
			<tr className='hover:bg-gray-100 duration-150 py-3'>
				<td className='w-2/12 px-2 py-3' >{data && data.campaign_id}</td>
				<td className='w-2/12 px-2 py-3' >{data && data.campaign_name}</td>
				<td className='w-1/12 px-2 py-3' >{data && data.clicks}</td>
				<td className='w-2/12 px-2 py-3'>{data && data.conversion}</td>
				<td className='w-2/12 px-2 py-3'>{data && data.payout_per_account}</td>
				<td className='w-2/12 px-2 py-3'>{data && data.revenue}</td>
			</tr>
		</>
	)
}

export default ReportManagerTableRow