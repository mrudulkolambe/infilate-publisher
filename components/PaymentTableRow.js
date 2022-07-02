import React, { useState } from 'react'


const PaymentTableRow = ({ data }) => {
	let dateString = `${new Date(data && data.timestamp).getDate()}/${new Date(data && data.timestamp).getMonth() + 1}/${new Date(data && data.timestamp).getFullYear()}`
	return (
		<>
			<div className='w-full border shadow-lg px-3 my-1 py-2 rounded-xl'>
				<div className='py-2 flex w-full'>
					<div className='w-4/12'>Date: <span className='font-bold'>{dateString}</span></div>
					<div className='w-3/12'>Total: <span className='font-bold'>{data && data.revenue}</span></div>
					<div className='w-3/12'>Ready for withdrawal: <span className='font-bold'>{data && data.ready_for_withdrawal}</span></div>
					<div className='w-3/12'>Status: <span className='font-bold'>{data && data.status}</span></div>
				</div>

			</div>
		</>
	)
}

export default PaymentTableRow