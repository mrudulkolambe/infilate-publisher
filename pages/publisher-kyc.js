import React, { useEffect, useState } from 'react'
import { doc, updateDoc } from "firebase/firestore"
import { useAuthContext } from '../context/Auth'
import Spinner from '../components/Spinner'
import { db } from '../context/firebase_config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const PublisherKYC = () => {

	const { userData } = useAuthContext()
	const [pancardnumber, setPanCardNumber] = useState(userData && userData.pan)
	const [aadhaarcardnumber, setAadhaarCardNumber] = useState(userData && userData.aadhaar)
	const [pancardFile, setPancardFile] = useState()
	const [adharcardFile, setAadharcardFile] = useState()
	const { user, setAlert } = useAuthContext()
	const [loading, setLoading] = useState(false);
	const [uploading, setUploading] = useState(false)

	useEffect(() => {
		if (userData) {
			setPanCardNumber(userData.pancardnumber)
			setAadhaarCardNumber(userData.aadhaarcardnumber)
		}
	}, [userData])

	const applyKYC = async () => {
		if (user) {
			if (user.emailVerified) {
				await updateDoc(doc(db, "publisher_database", user.uid), {
					aadhaarcardnumber: aadhaarcardnumber,
					pancardnumber: pancardnumber,
				})
					.then(() => {
						setLoading(false)
						setAlert('Applied For KYC!');
					})
			}
		} else {
			console.log("No such document!");
		}
	}


	useEffect(() => {
		if (pancardFile) {
			uploadFiles(pancardFile, "pan", `kyc_details/pan_${user.uid}.pdf`)
		}
	}, [pancardFile])


	useEffect(() => {
		if (adharcardFile) {
			uploadFiles(adharcardFile, "aadhaar", `kyc_details/aadhaar_${user.uid}.pdf`)
		}
	}, [adharcardFile])


	const uploadFiles = (file, type, path) => {
		if (user && !uploading) {
			setUploading(true)
			const storage = getStorage();
			const storageRef = ref(storage, path);

			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on('state_changed',
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused');
							break;
						case 'running':
							console.log('Upload is running');
							break;
					}
				},
				(error) => {
					console.log(error)
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						const docRef = doc(db, "publisher_database", user.uid);
						if (type === "aadhaar") {
							await updateDoc(docRef, {
								aadhaarURL: downloadURL
							});
						} else {
							await updateDoc(docRef, {
								panURL: downloadURL
							});
						}
						setUploading(false)
					});
				}
			);
		}
	}

	return (
		<>
			<div className='hidden lg:flex left-position absolute top-20 px-5 py-6 Nunito w-10/12 justify-center items-center calc-height'>
				<div className='w-6/12 shadow-lg p-5 rounded-lg border'>
					<h1 className="text-center font-bold text-3xl mb-6">Publisher KYC Form</h1>

					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='pan_card_number' className='font-bold text-gray-600 cursor-pointer'>PAN Card Number</label>
						<input id='pan_card_number' value={pancardnumber} onChange={(e) => { setPanCardNumber(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='AO1123DQ76' />
					</div>

					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='pancardfile' className='font-bold text-gray-600 cursor-pointer'>PAN Card: </label>
						<input id='pancardfile' accept='.pdf' onChange={(e) => { setPancardFile(e.target.files[0]) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="file" placeholder='Pan Card pdf' />
					</div>

					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='pan_card_number' className='font-bold text-gray-600 cursor-pointer'>Aadhaar Card Number</label>
						<input id='pan_card_number' value={aadhaarcardnumber} onChange={(e) => { setAadhaarCardNumber(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='AO1123DQ76' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='aadharcardfile' className='font-bold text-gray-600 cursor-pointer'>Aadhaar Card: </label>
						<input id='aadharcardfile' accept='.pdf' onChange={(e) => { setAadharcardFile(e.target.files[0]) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="file" placeholder='Pan Card pdf' />
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
						<label htmlFor='pan_card_number' className='font-bold text-gray-600 cursor-pointer'>PAN Card Number</label>
						<input id='pan_card_number' value={pancardnumber} onChange={(e) => { setPanCardNumber(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='AO1123DQ76' />
					</div>

					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='pancardfile' className='font-bold text-gray-600 cursor-pointer'>PAN Card: </label>
						<input id='pancardfile' onChange={(e) => { setPancardFile(e.target.files[0]) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="file" placeholder='image, DOCX, pdf' />
					</div>

					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='pan_card_number' className='font-bold text-gray-600 cursor-pointer'>Aadhaar Card Number</label>
						<input id='pan_card_number' value={aadhaarcardnumber} onChange={(e) => { setAadhaarCardNumber(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='AO1123DQ76' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='aadharcardfile' className='font-bold text-gray-600 cursor-pointer'>Aadhaar Card: </label>
						<input id='aadharcardfile' onChange={(e) => { setAadharcardFile(e.target.files[0]) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="file" placeholder='image, DOCX, pdf' />
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