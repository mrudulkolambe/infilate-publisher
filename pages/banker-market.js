import React,{useState} from 'react'
import Link from 'next/link'
import {MdOutlineClose} from 'react-icons/md'
import Spinner from '../components/Spinner'

const BankerMarket = () => {
	const [loading, setLoading] = useState(false)
	return (
		<>
			<div className='hidden lg:flex left-position absolute top-20 px-5 py-6 Nunito w-10/12 justify-center items-center calc-height'>
				<div className='w-6/12 shadow-lg p-5 rounded-lg border'>
					<div className='p-3 rounded-full duration-150 hover:bg-gray-100 bg-opacity-30 absolute top-6 right-6'><MdOutlineClose/></div>
					<h1 className="text-center font-bold text-3xl mb-6">Banker Market</h1>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='name' className='font-bold text-gray-600 cursor-pointer'>Customer Name</label>
						<input id='name' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='John Doe' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='email' className='font-bold text-gray-600 cursor-pointer'>Contact Number</label>
						<input id='email' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='eg. user@gmail.com' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='password' className='font-bold text-gray-600 cursor-pointer'>Customer Email Address</label>
						<input id='password' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='********' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='password' className='font-bold text-gray-600 cursor-pointer'>Pincode</label>
						<input id='password' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='********' />
					</div>
					<div>
						<button className='flex items-center justify-center text-white font-bold bg-gray-900 duration-200 px-3 py-2 rounded-lg hover:bg-gray-700 mt-5 w-full'>{loading ? <Spinner /> : 'Sign Up'}</button>
					</div>
				</div>
			</div>

			<div className='lg:hidden sm:block absolute top-20 px-5 py-6 Nunito w-full flex flex-col md:flex-row  justify-center items-center calc-height'>
				<div className='w-full shadow-lg p-3 rounded-lg mt-5'>
				<div className='p-3 rounded-full duration-150 hover:bg-gray-100 bg-opacity-30 absolute top-6 right-6'><MdOutlineClose/></div>
					<h1 className='mt-4 font-bold text-4xl'>Infilate Sign Up</h1>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='name' className='font-bold text-gray-600 cursor-pointer'>Customer Name</label>
						<input id='name' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='John Doe' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='email' className='font-bold text-gray-600 cursor-pointer'>Contact Number</label>
						<input id='email' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='eg. user@gmail.com' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='password' className='font-bold text-gray-600 cursor-pointer'>Customer Email Address</label>
						<input id='password' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='********' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='password' className='font-bold text-gray-600 cursor-pointer'>Pincode</label>
						<input id='password' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='********' />
					</div>
					<div>
						<button className='text-white font-bold bg-gray-900 duration-200 px-3 py-2 rounded-lg hover:bg-gray-700 mt-3 w-full'>{loading ? <Spinner /> : "Sign Up"}</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default BankerMarket