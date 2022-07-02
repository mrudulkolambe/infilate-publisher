import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto'

const PaymentCharts = ({ graphDetails }) => {
	console.log(graphDetails)
	const [labels, setLabels] = useState([])
	const [withdrawal, setWithdrawal] = useState([])
	Chart.register(CategoryScale);
	useEffect(() => {
		if (graphDetails) {
			let labelArr = []
			let withdrawalArr = []
			graphDetails.forEach((item) => {
				labelArr.push(item.date)
				withdrawalArr.push(Number(item.ready_for_withdrawal))
			})
			setLabels(labelArr)
			setWithdrawal(withdrawalArr)
		}
	}, [graphDetails]);
	const data = {
		labels: labels,
		datasets: [
			{
				label: "Payment",
				data: withdrawal,
				fill: false,
				borderColor: "rgba(75,192,192,1)"
			}
		]
	}
	return (
		<>
			<Line data={data} />
		</>
	)
}

export default PaymentCharts