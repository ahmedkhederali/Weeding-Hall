import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getDatingHallNum } from '../services/AdminServices/HallTypeNum';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Date VS Booked',
    },
  },
};



export function LineChart() {
    const[labels,setLabels]=useState([])
  const [datas,setDatas]=useState([])
  useEffect(()=>{
    getDatingHallNum().then((res)=>{
      setLabels(res.data.labels)
      setDatas(res.data.datas)
    }).catch((err)=>{
      console.log(err)
    })
  },[])
console.log(datas,labels)
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: datas,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
