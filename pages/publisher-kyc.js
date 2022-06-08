import React, { useState } from 'react'
import { doc, setDoc } from "firebase/firestore"
import { useAuthContext } from '../context/Auth'
import Spinner from '../components/Spinner'
import { db } from '../context/firebase_config'

const PublisherKYC = () => {
	const [phone, setPhone] = useState("")
	const [pancardnumber, setPanCardNumber] = useState("")
	const [aadhaarcardnumber, setAadhaarCardNumber] = useState("")
	const { user } = useAuthContext()
	const [loading, setLoading] = useState(false)
	const applyKYC = async () => {
		setLoading(true)
		if (user) {
			await setDoc(doc(db, "publisher_kyc", user.uid), {
				name: user.displayName,
				email: user.email,
				uid: user.uid,
				aadhaarcardnumber,
				pancardnumber,
				phone,
				status: 'Pending'
			})
			.then(() => {
				setLoading(false)
			})
		}
	}
	return (
		<>
			<div className='hidden lg:flex left-position absolute top-20 px-5 py-6 Nunito w-10/12 justify-center items-center calc-height'>
				<div className='w-6/12 shadow-lg p-5 rounded-lg border'>
					<h1 className="text-center font-bold text-3xl mb-6">Publisher KYC Form</h1>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='phone' className='font-bold text-gray-600 cursor-pointer'>Phone Number</label>
						<input id='phone' value={phone} onChange={(e) => { setPhone(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='+91 9876543210' />
					</div>

					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='pan_card_number' className='font-bold text-gray-600 cursor-pointer'>PAN Card Number</label>
						<input id='pan_card_number' value={pancardnumber} onChange={(e) => { setPanCardNumber(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='AO1123DQ76' />
					</div>

					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='pan_card_number' className='font-bold text-gray-600 cursor-pointer'>Aadhaar Card Number</label>
						<input id='pan_card_number' value={aadhaarcardnumber} onChange={(e) => { setAadhaarCardNumber(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='AO1123DQ76' />
					</div>
					<div>
						<button onClick={applyKYC} className='flex items-center justify-center text-white font-bold bg-gray-900 duration-200 px-3 py-2 rounded-lg hover:bg-gray-700 mt-5 w-full'>{loading ? <Spinner /> : 'Apply'}</button>
					</div>
				</div>
			</div>


			<div className='lg:hidden sm:block absolute top-20 px-5 py-6 Nunito w-full flex flex-col md:flex-row  justify-center items-center calc-height'>
				<div className='w-full shadow-lg p-3 rounded-lg mt-5'>
					<h1 className='mt-4 font-bold text-4xl'>Publisher KYC Form</h1>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='phone' className='font-bold text-gray-600 cursor-pointer'>Phone Number</label>
						<input id='phone' value={phone} onChange={(e) => { setPhone(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='+91 9876543210' />
					</div>

					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='pan_card_number' className='font-bold text-gray-600 cursor-pointer'>PAN Card Number</label>
						<input id='pan_card_number' value={pancardnumber} onChange={(e) => { setPanCardNumber(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='AO1123DQ76' />
					</div>

					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='pan_card_number' className='font-bold text-gray-600 cursor-pointer'>Aadhaar Card Number</label>
						<input id='pan_card_number' value={aadhaarcardnumber} onChange={(e) => { setAadhaarCardNumber(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='AO1123DQ76' />
					</div>
					<div>
						<button onClick={applyKYC} className='flex items-center justify-center text-white font-bold bg-gray-900 duration-200 px-3 py-2 rounded-lg hover:bg-gray-700 mt-5 w-full'>{loading ? <Spinner /> : 'Apply'}</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default PublisherKYC