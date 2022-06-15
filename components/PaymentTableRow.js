import React, { useState } from 'react'


const PaymentTableRow = ({ data }) => {
	return (
		<>
			<div className='w-full border shadow-lg px-3 my-1 py-2 rounded-xl'>
				<div className='py-2 flex w-full'>
					<div className='w-6/12'>{data && data.name}</div>
					<div className='w-3/12'>{data && data.amount}</div>
					<div className='w-3/12 flex justify-between cursor-pointer'>{data && data.type}</div>
				</div>

			</div>
		</>
	)
}

export default PaymentTableRow