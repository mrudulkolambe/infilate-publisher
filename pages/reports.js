import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import HeadComponent from '../components/HeadComponent'
import ReportManagerTableRow from '../components/ReportManagerTableRow'
import { useReportData } from '../context/reportData'


const ReportManager = () => {
	const { reportData } = useReportData()
	return (
		<>
			<HeadComponent title={'Report Manager'} />
			<div className='lg:block hidden left-position absolute top-20 px-5 py-6 Nunito w-10/12'>
				<div className='flex justify-between items-center px-4'>
					<h2 className='text-4xl font-bold'>Reports</h2>
					<div className='relative flex items-center border-gray-500 border rounded-lg overflow-hidden'>
						<input type="text" className='outline-none px-4 py-2 pr-8' placeholder='Search...' />
						<BsSearch className='absolute right-2 ml-3' />
					</div>
				</div>
				<div className='flex justify-between items-center px-4 mt-4'>
					<input type="text" className='border outline-none px-4 py-2 pr-8 ml-4' placeholder='Search...' />
					<button className='bg-gray-900 text-white font-bold rounded-lg px-3 py-1 hover:bg-gray-700'>Export Data</button>
				</div>
				<div className='mt-10 w-full'>
					<h1 className='my-3 text-3xl font-bold mb-5'>All Referrals</h1>
					<table className='w-full text-left'>
						<thead>
							<tr className='w-full border-b'>
								<th className='px-2 py-3 w-2/12' >Campaign Id</th>
								<th className='px-2 py-3 w-2/12' >Campaign Name</th>
								<th className='px-2 py-3 w-1/12' >Clicks</th>
								<th className='px-2 py-3 w-2/12' >Conversion</th>
								<th className='px-2 py-3 w-2/12' >Payout Per Conversion</th>
								<th className='px-2 py-3 w-2/12' >Total Payout</th>
							</tr>
						</thead>
						<tbody className='mt-3 height-report overflow-auto'>
							{
								reportData && reportData.map((data, i) => {
									return <ReportManagerTableRow key={data.id} index={i} data={data} />
								})
							}
						</tbody>
					</table>
				</div>
			</div>

			<div className='lg:hidden sm:block absolute top-20 px-5 py-6 Nunito w-full'>
				<div className='flex md:justify-between md:items-center md:flex-row flex-col px-4'>
					<h2 className='text-4xl font-bold'>Reports</h2>
					<div className='md:mt-0 mt-3 relative flex items-center border-gray-500 border rounded-lg overflow-hidden'>
						<input type="text" className='outline-none px-4 py-2 pr-8' placeholder='Search...' />
						<BsSearch className='absolute right-2 ml-3' />
					</div>
				</div>
				<div className='md:flex-row flex-col flex md:justify-between md:items-center px-4 mt-4'>
					<input type="text" className='border outline-none px-4 py-2 md:pr-8 md:ml-4' placeholder='Search...' />
					<button className='w-max md:mt-0 mt-3 bg-gray-900 text-white font-bold rounded-lg px-3 py-1 hover:bg-gray-700'>Export Data</button>
				</div>
				<div className='mt-10 w-full overflow-x-scroll'>
					<h1 className='my-3 text-3xl font-bold mb-5'>All Referrals</h1>
					<table className='w-full text-left'>
						<thead>
							<tr className='w-full border-b'>
								<th className='px-2 py-3 w-2/12' >Campaign Id</th>
								<th className='px-2 py-3 w-2/12' >Campaign Name</th>
								<th className='px-2 py-3 w-1/12' >Clicks</th>
								<th className='px-2 py-3 w-2/12' >Conversion</th>
								<th className='px-2 py-3 w-2/12' >Payout Per Conversion</th>
								<th className='px-2 py-3 w-2/12' >Total Payout</th>
							</tr>
						</thead>
						<tbody className='mt-3 height-report overflow-auto'>
							{
								reportData && reportData.map((data, i) => {
									return <ReportManagerTableRow key={data.id} index={i} data={data} />
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default ReportManager