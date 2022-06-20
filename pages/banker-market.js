import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { MdOutlineClose } from 'react-icons/md'
import Spinner from '../components/Spinner'
import { useRouter } from 'next/router'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuthContext } from '../context/Auth'
import BankerCard from '../components/BankerCard'
import { db } from '../context/firebase_config'

const BankerMarket = () => {
	const [loading, setLoading] = useState(false)
	const [url, setURL] = useState('')
	const [btn, setBtn] = useState('Copy!')
	const router = useRouter()
	console.log(router)
	const { user, setAlert } = useAuthContext()
	const [bankerData, setBankerData] = useState()
	useEffect(() => {
		if (user) {
			setURL(`${window.location.origin}/banker-market/${user && user.uid}`)
			const q = query(collection(db, "banker_data"), where("publisher_uid", "==", user.uid));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const arr = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					arr.push(obj);
				});
				setBankerData(arr)
			});
		}
	}, [user]);

	const copyFunc = () => {
		setBtn('Copied!');
		navigator.clipboard.writeText(url)
		setAlert('Link Copied!')
		setTimeout(() => {
			setBtn('Copy!')
		}, 1000);
	}
	return (
		<>
			<div className='hidden lg:block left-position absolute top-20 px-5 py-6 Nunito w-10/12'>
				<div className='mt-4 flex items-center'>
					<label>Banker URL: </label>
					<div className='relative'>
						<input type="text" className='outline-none cursor-pointer ml-4 px-4 py-2 rounded-lg w-96 border-2' value={url} readOnly />
						<button onClick={copyFunc} className='hover:bg-blue-500 duration-300 ml-3 font-bold text-white px-2 py-1 w-20 bg-blue-600 rounded-lg'>{btn}</button>
					</div>
				</div>

				<div className='mt-8'>
					<h1 className='font-bold text-3xl'>Data: </h1>
					<div className='grid mt-3 gap-y-6 grid-cols-3'>
						{
							bankerData && bankerData.map((data, i) => {
								return <BankerCard key={i} data={data} />
							})
						}
					</div>
				</div>

			</div>
		</>
	)
}

export default BankerMarket